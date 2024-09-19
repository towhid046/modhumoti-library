import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./data";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        try {
          const user = getUserByEmail(credentials.email);

          if (!user) {
            throw new Error("User not found");
          }

          // Compare password
          const isMatch = user.password === credentials.password;

          if (!isMatch) {
            throw new Error("Incorrect password");
          }

          // Return user object if authentication is successful
          return user;
        } catch (err) {
          console.error("Login error:", err);
          throw new Error(err.message || "Login failed");
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
});
