import React from "react";
import { IoLibraryOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to={"/"} className="flex items-center max-w-max gap-2">
      {" "}
      <IoLibraryOutline className="text-3xl xl:flex hidden text-gray-400" />
      <h2 className="md:text-3xl text-2xl font-bold text-gray-400">Modhumoti</h2>
    </Link>
  );
};

export default Logo;