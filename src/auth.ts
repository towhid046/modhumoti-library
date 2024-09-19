import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "./lib/connectDB";

export const {
  handlers: { GET, POST },
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        try {
          const db = await connectDB();
          const usersCollection = db.collection("users");
          const user = await usersCollection.findOne({ email });
          if (!user) {
            throw new Error("User not found");
          }

          const isMatch = bcrypt.compareSync(password, user?.password);
          if (!isMatch) {
            throw new Error("Incorrect password");
          }
          return user;
        } catch (err) {
          console.error("Login error:", err);
          throw new Error(err?.message || "Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
});
