import Link from "next/link";
import Button from "@/components/shared/Button/Button";
import { FaArrowTrendUp } from "react-icons/fa6";
interface ViewMoreButtonProps {
  label: string;
  url: string;
}
const ViewMoreButton = ({ label, url }: ViewMoreButtonProps) => {
  return (
    <div className="flex md:hidden justify-center pt-8 ">
      <Link href={url}>
        <Button customClass="rounded-full flex items-center gap-4 ">
          <span>{label}</span>
          <FaArrowTrendUp className="text-xl text-base-300" />
        </Button>
      </Link>
    </div>
  );
};
export default ViewMoreButton;
