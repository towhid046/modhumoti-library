interface SectionHeadingProps {
  title: string;
  description: string;
  customClass?: string;
}
const SectionHeading = ({ title, description,customClass='text-center pb-4' }: SectionHeadingProps) => {
  return (
    <div className={`${customClass} mb-2    container mx-auto `}>
      <h2 className="text-gray-400 font-semibold text-3xl mb-1 uppercase">
        {title}
      </h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default SectionHeading;
