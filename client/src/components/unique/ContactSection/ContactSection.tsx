import Reveal from "../../shared/Reveal/Reveal";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import MapLeaflet from '../MapLeaflet/MapLeaflet';
import ContactForm from "./ContactForm/ContactForm";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaExpand } from "react-icons/fa";

import { useState } from "react";
import MapLeafletFull from "../MapLeaflet/MapLeafletFull";

const contactsInfo = [
  { id: 2001, title: <MdOutlineEmail />, address: "modhumoti290@gmail.com" },
  {
    id: 2002,
    title: <MdOutlinePhoneInTalk />,
    address: "+880 1912345678",
  },
  { id: 2003, title: <FaSquareWhatsapp />, address: "+880 1712345678" },
  {
    id: 2004,
    title: <FaLocationDot />,
    address: "Balur Mat, Gobra, Gopalganj Sadar",
  },
];

const ContactSection = () => {
  const [isMapShowFull, setIsMapShowFull] = useState<boolean>(false);

  return (
    <>
      <section className="container mx-auto px-4 md:mb-32 mb-10">
        <SectionHeader
          url=""
          title="Get In"
          actionText="Touch"
          urlLabel=""
        />
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <Reveal className="lg:flex-1 w-full">
            <div className="flex-1 flex flex-col justify-between gap-5">
              <table>
                <tbody>
                  {contactsInfo?.map((item) => (
                    <tr key={item.id} className="space-y-3">
                      <td className="text-xl">{item.title}</td>
                      <td>{item.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="relative top-4">
                <MapLeaflet className="h-60" />
                <div className="absolute z-50 bottom-2 left-2">
                  <button
                    className="p-2 bg-white rounded-full"
                    onClick={() => setIsMapShowFull(true)}
                  >
                    <FaExpand className="h-6 w-6 text-primary-color" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:flex-1 w-full">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {isMapShowFull && <MapLeafletFull setIsMapShowFull={setIsMapShowFull} />}
    </>
  );
};

export default ContactSection;
