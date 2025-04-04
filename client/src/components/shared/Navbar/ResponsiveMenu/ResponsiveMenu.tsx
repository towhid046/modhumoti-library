import React from "react";
import { Link } from 'react-router-dom';

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/books", label: "Books" },
  { path: "/sheets", label: "Sheets" },
  { path: "/stationary", label: "Stationary" },
];

interface ResponsiveMenuProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponsiveMenu = ({ setIsMenuOpen }: ResponsiveMenuProps) => {
  const pathName = '/hi'

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
                className={`inline-block px-12 w-full  py-2 hover:bg-blue-100  transition duration-300 ${pathName === link.path && 'text-primary-color'}`}
                to={link.path}
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
