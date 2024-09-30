import Link from "next/link";
import React from "react";
import { IoLibraryOutline } from "react-icons/io5";

const Logo:React.FC = () => {
  return (
    <Link href={"/"} className="flex items-center max-w-max gap-2">
      {" "}
      <IoLibraryOutline className="text-3xl xl:flex hidden text-gray-400" />
      <h2 className="md:text-3xl text-2xl font-bold text-gray-400">Boi Poka</h2>
    </Link>
  );
};

export default Logo;