import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import ContactForm from "./ContactForm/ContactForm";
import Image from "next/image";
import customerSupportImage from "../../../assets/images/customer-support.png";

const ContactSection = () => {
  return (
    <>
      <section className="container mx-auto px-4 mb-32">
        <SectionHeader
          url=""
          title="Get In"
          actionText="Touch"
          urlLabel=""
        />

        <div className="flex flex-col lg:flex-row items-center lg:gap-10 gap-5">
          <div className="lg:flex-1 w-full">
            <ContactForm />
          </div>

          <div className="lg:flex-1 w-full">
            <div className="flex  justify-center">
              <Image
                width={undefined}
                height={undefined}
                src={customerSupportImage}
                alt="Customer Support Image"
                className="max-w-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
