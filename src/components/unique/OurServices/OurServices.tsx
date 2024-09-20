import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import Image from "next/image";
const services = [1, 2, 3, 4, 5, 6];

const OurServices = () => {
  return (
    <section className="container mx-auto px-4 mb-24">
      <SectionHeading
        title="Our Services"
        description="See all our services at a glance"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 ">
        {services?.map((service) => (
          <div
            key={service}
            className="hover:shadow-lg transition duration-300 space-y-7 p-6 bg-base-100 shadow-sm "
          >
            <figure>
              <Image
                width={100}
                height={100}
                src="https://techfit-react.envytheme.com/_next/static/media/icon1.dd1e4cfd.png"
                alt="Image"
                className="object-cover"
              />
            </figure>
            <div className="space-y-3">
              <h3 className="lg:text-3xl text-gray-700 text-2xl font-semibold">
                Research Binding
              </h3>
              <p className="text-gray-500 text-justify">
                Replace this text with some meaningful text in later. Replace this
                text with some meaningful text in later{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
