import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/books", label: "Books" },
  { path: "/sheets", label: "Sheets" },
  { path: "/stationeries", label: "Stationary" },
];

const NavLinks = () => {
  const pathName = usePathname();
  return (
    <ul className="xl:flex hidden font-normal text-gray-500 items-center text-[15px] gap-5">
      {navLinks.map((link) => (
        <Link key={link.path} href={link.path}>
          <li
            className={`flex items-center lg:gap-2 gap-1.5 ${
              pathName === link.path
                ? "text-primary-color"
                : "hover:text-primary-color"
            } duration-300 transition `}
          >
            {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default NavLinks;
