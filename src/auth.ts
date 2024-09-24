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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const db = await connectDB();
          const usersCollection = db.collection("users");

          // Find the user by email
          const user = await usersCollection.findOne({ email: credentials.email });
          if (!user || !user.password) {
            throw new Error("User not found or password is missing");
          }

          // Check if password and user.password are strings
          if (typeof credentials.password !== 'string' || typeof user.password !== 'string') {
            throw new Error("Invalid password format");
          }

          // Check if the password matches the hashed password
          const isMatch = bcrypt.compareSync(credentials.password, user.password);
          if (!isMatch) {
            throw new Error("Incorrect password");
          }

          // Return user if everything is correct
          return { id: user._id.toString(), email: user.email, name: user.name };
        } catch (err) {
          console.error("Login error:", err);
          throw new Error("Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
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
