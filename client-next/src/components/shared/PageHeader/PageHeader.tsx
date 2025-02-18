import Link from "next/link";
interface PageHeaderProps {
  title: string;
  url: string;
}
const PageHeader = ({ title, url }: PageHeaderProps) => {
  return (
    <header className=" bg-base-200  lg:py-10 py-7  mb-5 opacity-70">
      <div className="flex items-center gap-2 container mx-auto px-4">
      <Link
        className="hover:text-primary-color duration-300 transition"
        href="/"
      >
        Home
      </Link>{" "}
      /{" "}
      <Link className="text-primary-color " href={url}>
        {title}
      </Link>
      </div>
    </header>
  );
};
export default PageHeader;
