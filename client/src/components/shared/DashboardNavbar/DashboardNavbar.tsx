import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaUserGraduate
} from "react-icons/fa";
import {
  MdOutlineSpaceDashboard
} from "react-icons/md";
import Logo from "../Logo/Logo";

const navLinks = [
  {
    path: "/dashboard/manage-books",
    label: "Manage Books",
    icon: MdOutlineSpaceDashboard,
  },
  {
    path: "/dashboard/manage-stationers",
    label: "Manage Stationers",
    icon: FaUserGraduate,
  },
];

const mainNavLinks = [
  { path: "/", label: "Home", icon: FaHome },
];

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="w-60 h-[90vh] sticky top-0 bg-base-200 min-h-screen py-12 z-50">
      <div className=" w-60">
        <div className="text-center mb-8 px-4 italic">
          <Logo />
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh-8rem)]">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} passHref>
                <div className="flex items-center w-full py-2 px-4 lg:gap-2 gap-1.5 border-l-2 duration-300 transition hover:bg-blue-100 border-base-200 hover:border-primary-color">
                  <li className="flex items-center gap-2">
                    <span>
                      <link.icon />
                    </span>
                    <span>{link.label}</span>
                  </li>
                </div>
              </Link>
            ))}
          </ul>

          <div>
            <div className="my-3">
              <hr />
            </div>
            <ul className="flex flex-col gap-1.5">
              {mainNavLinks.map((link) => (
                <Link key={link.path} href={link.path} passHref>
                  <div className="flex items-center w-full py-2 px-4 lg:gap-2 gap-1.5 border-l-2 duration-300 transition hover:bg-blue-100 border-base-200 hover:border-primary-color">
                    <li className="flex items-center gap-2">
                      <span>
                        <link.icon />
                      </span>
                      <span>{link.label}</span>
                    </li>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;