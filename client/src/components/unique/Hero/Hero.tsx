import React from "react";
import { IoLibraryOutline } from "react-icons/io5";
import Button from "../../shared/Button/Button";
import { Link } from "react-router-dom";
import Reveal from "../../shared/Reveal/Reveal";

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto min-h-[95vh] px-4 items-center gap-5 py-8 ">
        <Reveal className="flex-1 md:text-left text-center">
          <div className="max-w-xl">
            <p className="font-semibold italic text-gray- 400 text-xl">
              Welcome to --{" "}
            </p>{" "}
            <h2 className="lg:text-7xl md:text-4xl text-3xl font-bold bg-gradient-to-r from-primary-color  to-gray-300 inline-block text-transparent bg-clip-text">
              {" "}
              Modhumoti Library!
            </h2>
            <p className="font-semibold text-gray-600 text-lg mt-2"> </p>
            <p className="text-gray-500 my-4">
              Your trusted source for Books, Sheets, and Stationeries. Your
              trusted source for Books, Sheets, and Stationeries.{" "}
            </p>
            <Link to="/sheets">
              <Button>Order Sheets</Button>
            </Link>
          </div>
        </Reveal>
        <Reveal className="flex-1 flex justify-center">
          <IoLibraryOutline className="lg:text-[320px] text-[220px] text-gray-400" />
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
