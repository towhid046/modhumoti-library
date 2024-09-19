interface SectionHeadingProps {
  title: string;
  description: string;
}
const SectionHeading = ({ title, description }: SectionHeadingProps) => {
  return (
    <div className=" py-4 mb-2 text-center   container mx-auto ">
      <h2 className="text-gray-400 font-semibold text-3xl mb-1 uppercase">
        {title}
      </h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default SectionHeading;
