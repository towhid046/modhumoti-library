import Link from "next/link";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { usePathname } from "next/navigation";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/books", label: "Books" },
  { path: "/sheets", label: "Sheets" },
  { path: "/stationeries", label: "Stationary" },
];

interface ResponsiveMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponsiveMenu = ({ setIsMenuOpen }: ResponsiveMenuProps) => {
  const pathName = usePathname();

  return (
    <nav
      onClick={() => setIsMenuOpen(false)}
      className={`font-poppins fixed w-full top-0 z-50 h-full  transition-transform xl:hidden min-h-screen `}
    >
      <div className="relative container mx-auto px-4 top-0 left-0  w-full min-h-screen">
        <ul
          onClick={(e) => e.stopPropagation()}
          className=" bg-base-100 text-gray-600 max-w-max absolute shadow-lg left-4 top-16 py-5"
        >
          
          {navLinks?.map((link) => (
            <li onClick={() => setIsMenuOpen(false)} key={link.path}>
              <Link
                className={`inline-block px-12 w-full  py-2 hover:bg-base-200  transition duration-300 ${pathName === link.path && 'text-primary-color'}`}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ResponsiveMenu;
