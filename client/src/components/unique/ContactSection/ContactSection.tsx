import customerSupportImage from "../../../assets/images/customer-support.png";
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
          <div className="lg:flex-1 w-full">
            <ContactForm />
          </div>

          <div className="lg:flex-1 w-full">
            <div className="flex  justify-center">
              <img
                src={customerSupportImage}
                alt="Customer Support Image"
                className="md:max-w-96 max-w-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
