import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

interface SectionHeadingProps {
  title: string;
  actionText: string;
  urlLabel?: string;
  url?: string;

  customClass?: string;
}
const SectionHeader = ({
  title,
  actionText,
  urlLabel,
  url = '',
  customClass,
}: SectionHeadingProps) => {
  return (
    <div className={`${customClass} mb-8 flex md:justify-between justify-center border-b  container mx-auto`}>
      <h2 className="text-gray-700 font-semibold md:text-3xl text-2xl border-b-4 border-primary-color pb-1">
        {title}{' '}
        <span className="text-primary-color">{actionText}</span>
      </h2>
      <Link href={url} className="md:flex hidden items-center gap-2 transition duration-500 underline text-primary-color hover:text-secondary-color">
        <span>{urlLabel}</span>
        {(url !== '' || urlLabel !== '') && <MdArrowOutward className="text-xl" />}
      </Link>
    </div>
  );
};

export default SectionHeader;
