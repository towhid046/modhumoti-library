"use client";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { FaExpand } from "react-icons/fa";
import { useState } from "react";
import MapLeaflet from "./MapLeaflet/MapLeaflet";
import MapLeafletFull from "./MapLeafletFull/MapLeafletFull";
import ContactForm from "./ContactForm/ContactForm";

const contactsInfo = [
  { id: 2001, title: <MdOutlineEmail />, address: "towhidmorol46@gmail.com" },
  {
    id: 2002,
    title: <MdOutlinePhoneInTalk />,
    address: "+88 01928182891 (10 AM - 6 PM)",
  },
  { id: 2003, title: <FaSquareWhatsapp />, address: "+88 01811699726" },
  {
    id: 2004,
    title: <FaLocationDot />,
    address: "Dhanmondi Road No-127, block-C, Dhaka, Bangladesh",
  },
];

const ContactSection = () => {
  const [isMapShowFull, setIsMapShowFull] = useState<boolean>(false);

  return (
    <>
      <section className="container mx-auto px-4 mb-32">
        <SectionHeader
          url="/"
          title="Get To"
          actionText="Contact"
          urlLabel="Contact Now"
        />

        <div className="flex flex-col lg:flex-row justify-between lg:gap-10 gap-5">
          <div
            data-aos="fade-right"
            className="flex-1 flex flex-col justify-between gap-5"
          >
            <table>
              <tbody>
                {contactsInfo?.map((item) => (
                  <tr key={item.id} className="space-y-3">
                    <td className="text-xl">{item.title}</td>
                    <td className="">{item.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="relative lg:top-8">
              <MapLeaflet height="h-60" />
              <div className="relative bottom-12 left-2 z-30">
                <button
                  className="p-2 bg-white rounded-full"
                  onClick={() => setIsMapShowFull(true)}
                >
                  <FaExpand className="h-6 w-6 text-primary-color" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </section>
      {isMapShowFull && <MapLeafletFull setIsMapShowFull={setIsMapShowFull} />}
    </>
  );
};

export default ContactSection;
