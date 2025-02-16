"use client";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedin, FaArrowTrendUp } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/Logo/Logo";

const socialIcons = [
  { component: FaFacebook, url: "https://facebook.com" },
  { component: FaLinkedin, url: "https://linkedin.com" },
  { component: FaInstagram, url: "https://instagram.com" },
  { component: FaXTwitter, url: "https://twitter.com" },
];

const contacts = [
  { icon: <IoMailOutline />, text: "abc123@gmail.com" },
  { icon: <LuPhone />, text: "+11 23456789123" },
  {
    icon: <FiMapPin />,
    text: "127 Midtown Manhattan, New York",
  },
];

const quickLinks = [
  { path: "/", label: "Home" },
  { path: "/books", label: "Books" },
  { path: "/sheets", label: "Sheets" },
  { path: "/stationeries", label: "Stationary" },
];

const Footer = () => {
  const path = usePathname();
  const isHidden = ["/login", "/registration"].includes(path) || path.split('/').includes('dashboard');

  return (
    <footer className={`bg-neutral ${isHidden ? "hidden" : ""}`}>
      <div>
        <div className="footer container border-b mx-auto px-4 p-10 text-neutral-content">
          {/* Logo & Description */}
          <div className="max-w-xs">
            <Logo />
            <p>
              At Modhumoti Library: You have your books, sheets, and stationery
              for quick solutions.
            </p>

            {/* Social Icons */}
            <ul className="mt-6 flex gap-3 text-xl items-center text-primary-color">
              {socialIcons.map((icon, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-base-300 transition duration-500 ease-in-out text-xl"
                >
                  <Link href={icon.url}>
                    <icon.component />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title text-lg">Quick Links</h6>
            {quickLinks.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className="link link-hover flex items-center gap-1 hover:text-primary-color transition duration-300 ease-in-out"
              >
                <IoIosArrowForward />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Section */}
          <ul>
            <h6 className="footer-title text-lg">Contact</h6>
            {contacts.map((contact, index) => (
              <li key={index} className="flex gap-3 mb-1">
                <span className="text-lg">{contact.icon}</span>
                <span>{contact.text}</span>
              </li>
            ))}
          </ul>

          {/* Newsletter Form */}
          <form
            className="max-w-xs"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h6 className="footer-title text-lg">Newsletter</h6>
            <p>Subscribe to our newsletter for exciting latest updates.</p>
            <fieldset className="form-control mt-1">
              <div className="join">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="input bg-base-200 text-base-content focus:outline-none border focus:border-primary-color join-item"
                  required
                />
                <button className="btn bg-primary-color border-none join-item hover:bg-secondary-color">
                  <FaArrowTrendUp className="text-xl text-base-300" />
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-neutral">
        <div className="container md:flex-row flex-col flex justify-between mx-auto px-4 items-center py-4 text-neutral-content text-[13px] gap-3">
          <p>Copyright &copy; {new Date().getFullYear()} - All rights reserved</p>
          <ul className="flex gap-3">
            <li className="link link-hover hover:text-primary-color transition duration-300 ease-in-out">
              Terms of use
            </li>
            |
            <li className="link link-hover hover:text-primary-color transition duration-300 ease-in-out">
              Privacy policy
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;