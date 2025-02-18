import { Link } from 'react-router-dom';
interface PageHeaderProps {
  title: string;
  url: string;
}
const PageHeader = ({ title, url }: PageHeaderProps) => {
  return (
    <header className=" bg-base-200  lg:py-6 py-4  mb-5 opacity-70">
      <div className="flex items-center gap-2 container mx-auto px-4">
        <Link
          className="hover:text-primary-color duration-300 transition"
          to="/"
        >
          Home
        </Link>{" "}
        /{" "}
        <Link className="text-primary-color " to={url}>
          {title}
        </Link>
      </div>
    </header>
  );
};
export default PageHeader;
