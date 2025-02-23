import { NavLink } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/books", label: "Books" },
  { path: "/sheets", label: "Sheets" },
  { path: "/stationary", label: "Stationary" },
];

const NavLinks = () => {
  return (
    <ul className="xl:flex hidden font-normal text-gray-500 items-center text-[15px] gap-5">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center lg:gap-2 gap-1.5 duration-300 transition ${isActive ? "text-primary-color" : "hover:text-primary-color"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </ul>
  );
};

export default NavLinks;
