"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Cart from "../Cart/Cart";
import LoadingSpinner from "./../../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import userProfile from "../../../../assets/images/profile_image.jpeg";

const LoggedUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const handleLogout = () => {
    setIsLoading(true);
    signOut({ redirect: false });
    router?.push("/");
    toast.success("Logout success!");
    if (!session) {
      setIsLoading(false);
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
          src={session?.data?.user?.image || userProfile}
          className="object-cover w-10 h-10 rounded-full border-2 hover:border-blue-200 transition duration-300"
          alt={session?.data?.user?.name || "User Image"}
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
              <li>Hi, {session?.data?.user?.name}</li>
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
