"use server";
import { auth, signIn, signOut } from "@/auth";
export const socialLogin = async (value) => {
  await signIn(value, { redirectTo: "/" });
};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
};
