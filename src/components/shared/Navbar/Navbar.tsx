"use client";
import Link from "next/link";
import React, { useState } from "react";

// import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

import Button from "../Button/Button";

import Cart from "./Cart/Cart";
import Logo from "./../Logo/Logo";
import ResponsiveMenu from "./ResponsiveMenu/ResponsiveMenu";
import SearchBook from "./SearchBook/SearchBook";
import NavLinks from "./NavLinks/NavLinks";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className={`py-3.5 shadow-sm bg-white z-50 text-[15px]`}>
        <div className="container flex justify-between mx-auto px-4 items-center">
          <div className="flex xl:flex-1 items-center xl:gap-7">
            <div className="xl:hidden text-xl mt-2 mr-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <Logo />
            <NavLinks />
          </div>

          <div className="flex xl:flex-1 items-center gap-8 justify-between">
            <div className="w-full md:flex hidden">
              <SearchBook />
            </div>
            {/* <Cart /> */}
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        </div>

        {/* for responsive menu */}
        {isMenuOpen && <ResponsiveMenu setIsMenuOpen={setIsMenuOpen} />}
      </nav>
      <div className="shadow-sm  md:hidden text-[15px]">
        <div className="container  mx-auto px-4 bg-base-100 pt-1 pb-2 ">
          <SearchBook />
        </div>
      </div>
    </>
  );
};

export default Navbar;
