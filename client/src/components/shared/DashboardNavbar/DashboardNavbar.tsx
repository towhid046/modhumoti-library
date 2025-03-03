import React from "react";
import { IoLibraryOutline, IoCartOutline } from "react-icons/io5";
import { GrMultiple } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    path: "/dashboard/manage-orders",
    label: "Manage Order",
    icon: IoCartOutline,
  },
  {
    path: "/dashboard/manage-books",
    label: "Manage Books",
    icon: IoLibraryOutline,
  },
  {
    path: "/dashboard/manage-stationers",
    label: "Manage Stationers",
    icon: GrMultiple,
  },
];

const mainNavLinks = [{ path: "/", label: "Home", icon: FaHome }];

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="w-72 h-[90vh] sticky top-0 bg-base-200 min-h-screen py-12 z-40">
      <div className="w-full">
        <div className="text-center mb-8 px-4 italic">
          <Logo />
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh-8rem)]">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center w-full py-2 px-4 lg:gap-2 gap-1.5 border-l-[3px] duration-300 transition ${isActive
                      ? "bg-blue-100 border-primary-color"
                      : "hover:border-blue-100 hover:bg-blue-100 border-base-200"
                    }`
                  }
                >
                  <span>{React.createElement(link.icon)}</span>
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div>
            <div className="my-3">
              <hr />
            </div>
            <ul className="flex flex-col gap-1.5">
              {mainNavLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center w-full py-2 px-4 lg:gap-2 gap-1.5 border-l-2 duration-300 transition ${isActive
                        ? "bg-blue-100 border-primary-color"
                        : "hover:border-blue-100 hover:bg-blue-100 border-base-200"
                      }`
                    }
                  >
                    <span>{React.createElement(link.icon)}</span>
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;