"use server";
import { signIn, signOut } from "@/auth";
export const socialLogin = async (value) => {
  await signIn(value, { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const credentialLogin = async ({ email, password }) => {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
