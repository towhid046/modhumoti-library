"use client"
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const buttons = [
  { icon: MdOutlineKeyboardDoubleArrowLeft, tip: "First Page" },
  { icon: MdOutlineKeyboardArrowLeft, tip: "Previous" },
  { icon: MdOutlineKeyboardArrowRight, tip: "Next" },
  { icon: MdOutlineKeyboardDoubleArrowRight, tip: "Last Page" },
];

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((currentPage + 1));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage - 1));
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePagination = (index: number) => {
    switch (index) {
      case 0:
        handleFirstPage();
        break;
      case 1:
        handlePrevious();
        break;
      case 2:
        handleNext();
        break;
      case 3:
        handleLastPage();
        break;
    }
  };

  return (
    <div className="flex md:justify-end justify-center pt-8">
      <div className="flex flex-col md:flex-row items-center md:gap-5 gap-2">
        <p>Page {currentPage} of {totalPages}</p>
        <div className="flex items-center gap-3">
          {buttons?.map((item, index) => (
            <button
              onClick={() => handlePagination(index)}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={item.tip}
              key={index}
              className="p-2 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:"
              disabled={(index === 0 && currentPage === 1) || (index === 1 && currentPage === 1) || (index === 2 && currentPage === totalPages) || (index === 3 && currentPage === totalPages)}
            >
              <item.icon size={24} />
            </button>
          ))}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Pagination;
