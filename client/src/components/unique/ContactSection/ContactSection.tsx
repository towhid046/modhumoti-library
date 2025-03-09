import customerSupportImage from "../../../assets/images/customer-support.png";
import Reveal from "../../shared/Reveal/Reveal";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import ContactForm from "./ContactForm/ContactForm";

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
          <Reveal className="lg:flex-1 w-full">
            <ContactForm />
          </Reveal>

          <Reveal className="lg:flex-1 w-full">
            <div className="flex  justify-center">
              <img
                src={customerSupportImage}
                alt="Customer Support Image"
                className="md:max-w-96 max-w-80 object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
