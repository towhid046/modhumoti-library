import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import Image from "next/image";
const services = [1, 2, 3, 4, 5, 6];

const OurServices = () => {
  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader
        title="Our"
        actionText="Services"
        url="/books"
        urlLabel="View Books"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 ">
        {services?.map((service) => (
          <div
            key={service}
            className="hover:shadow-lg transition duration-500 rounded-md space-y-7 p-5 bg-base-100 shadow-sm "
          >
            <figure className="flex justify-center">
              <Image
                width={100}
                height={100}
                src="https://techfit-react.envytheme.com/_next/static/media/icon1.dd1e4cfd.png"
                alt="Image"
                className="object-cover"
              />
            </figure>
            <div className="space-y-3 text-center">
              <h3 className="lg:text-3xl text-gray-700 text-2xl font-semibold">
                Research Binding
              </h3>
              <p className="text-gray-500">
                Replace this text with some meaningful text in later. Replace
                this text with some meaningful text in later{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
