import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
interface ViewMoreButtonProps {
  label: string;
  url: string;
}
const ViewMoreButton = ({ label, url }: ViewMoreButtonProps) => {
  return (
    <div className="flex md:hidden justify-center pt-8 ">
      <Link to={url}>
        <Button customClass="rounded-md flex items-center gap-4 ">
          <span>{label}</span>
          <FaArrowTrendUp className="text-xl text-base-300" />
        </Button>
      </Link>
    </div>
  );
};
export default ViewMoreButton;
