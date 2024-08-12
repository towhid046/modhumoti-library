interface SectionHeadingProps {
  title: string;
  description: string;
}
const SectionHeading = ({ title, description }: SectionHeadingProps) => {
  return (
    <div className=" py-4 px-4 container mx-auto ">
      <h2 className="text-gray-500 font-semibold text-3xl uppercase">
        {title}
      </h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default SectionHeading;
