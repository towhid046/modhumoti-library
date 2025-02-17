"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import Button from "../Button/Button";
import Logo from "./../Logo/Logo";
import LoggedUser from "./LoggedUser/LoggedUser";
import NavLinks from "./NavLinks/NavLinks";
import ResponsiveMenu from "./ResponsiveMenu/ResponsiveMenu";
import SearchBook from "./SearchBook/SearchBook";
import Cart from "./Cart/Cart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const path = usePathname();
  const session = useSession();

  return (
    <nav
      className={`${(["/login", "/registration"].includes(path) || path.split('/').includes('dashboard')) && "hidden"}`}
    >
      <div className={`relative py-3.5 shadow-sm bg-white z-50 text-[15px]`}>
        <div className="container flex justify-between mx-auto px-4 items-center">
          <div className="flex lg:flex-1 items-center xl:gap-7">
            <div className="xl:hidden text-xl mt-2 mr-2">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <Logo />
            <NavLinks />
          </div>

          <div className="flex lg:flex-1 items-center gap-8 justify-between">
            <figure
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsSearchClicked(!isSearchClicked)}
            >
              <button onClick={() => setIsSearchClicked(true)}>
                {!isSearchClicked && <RiSearchLine className="text-lg" />}
              </button>
            </figure>
            <div className="w-full md:flex hidden">
              <SearchBook />
            </div>
            <div>
              <Cart />
            </div>
            {session?.data?.user ? (
              <LoggedUser />
            ) : (
              <div>
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* for responsive menu */}
        {isMenuOpen && <ResponsiveMenu setIsMenuOpen={setIsMenuOpen} />}
        {isSearchClicked && (
          <div className="absolute top-2 left-0 md:hidden w-full text-[15px] bg-base-100 z-40">
            <div className="container  mx-auto px-4  pt-1 pb-2 ">
              <SearchBook setIsSearchClicked={setIsSearchClicked} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
