"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Cart from "../Cart/Cart";
import { logout } from "@/app/actions";
import LoadingSpinner from "./../../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
interface LoggedUserProps {
  session: object | null;
}
const LoggedUser = ({ session }: LoggedUserProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("Logout success!");
    } catch (error) {
      console.error(error.message);
    } finally {
      if (!session) {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex items-center gap-4">
      <Cart />
      <button className="h-10 w-10" onClick={() => setIsOpen(true)}>
        <Image
          height={45}
          width={45}
          src={session?.user?.image || ""}
          className="object-cover rounded-full border-2 hover:border-blue-200 transition duration-300"
          alt={session?.user?.name || ""}
        />
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed right-0 top-0 w-full min-h-screen"
        >
          <div className="relative container mx-auto px-4">
            <ul
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-md px-8 py-4 space-y-3 z-50  text-[17px] absolute right-4 top-16"
            >
              <li>Hi, {session?.user?.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 hover:text-red-600 transition duration-300"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedUser;
