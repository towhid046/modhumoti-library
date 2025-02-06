import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaHome,
} from "react-icons/fa";
import {
  MdOutlineSms,
  MdPayment,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import Link from "next/link";
import Logo from "../../../components/shared/Logo/Logo";
import { TfiBag } from "react-icons/tfi";
import { IoMdPhotos } from "react-icons/io";

const navLinks = [
  {
    path: "/dashboard/books",
    label: "Manage Books",
    icon: MdOutlineSpaceDashboard,
  },
  {
    path: "/dashboard/stationaries",
    label: "Manage Stationaris",
    icon: FaUserGraduate,
  },
  // {
  //   path: "/dashboard/teachers",
  //   label: "Manage Teachers",
  //   icon: FaChalkboardTeacher,
  // },
  // {
  //   path: "/dashboard/teachers-payment",
  //   label: "Teacher Payment",
  //   icon: MdPayment,
  // },
  // {
  //   path: "/dashboard/student-fees",
  //   label: "Student Fees",
  //   icon: RiMoneyDollarBoxLine,
  // },
  // { path: "/dashboard/send-sms", label: //"Send Sms", icon: MdOutlineSms },
  // { path: "/dashboard/others", label: //"Others Trans", icon: TfiBag },
  //
  // { path: "/dashboard/gallery-photo", label: "Gallery Photo", icon: IoMdPhotos },
];

const mainNavLinks = [
  { path: "/", label: "Home", icon: FaHome },
];

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="w-60 bg-base-200 min-h-screen py-12 ">
      <div className="fixed w-60 h-full">
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