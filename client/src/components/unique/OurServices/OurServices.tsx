import ErrorElement from "../../shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import useToGetPublicData from "./../../../hooks/useToGetPublicData";

interface Service {
  title: string;
  description: string;
  icon: string; // Assuming it's an SVG string
}

const OurServices = () => {
  const { data: services, isLoading, error } = useToGetPublicData<Service[]>("/services");

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorElement text={error.message} />;

  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader title="Our" actionText="Services" url="" urlLabel="" />
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5">
        {services?.map((service, index) => (
          <div
            key={index}
            className="hover:shadow-lg transition duration-500 rounded-md space-y-7 p-5 bg-base-100 shadow-sm"
          >
            <figure className="flex justify-center text-4xl">
              <span dangerouslySetInnerHTML={{ __html: service.icon }} />
            </figure>
            <div className="space-y-3 text-center">
              <h3 className="lg:text-3xl text-gray-700 text-2xl font-semibold">
                {service.title}
              </h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
