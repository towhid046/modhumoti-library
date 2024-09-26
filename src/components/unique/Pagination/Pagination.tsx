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

const Pagination = () => {
  return (
    <div className="flex justify-end pt-8">
      <div className="flex flex-col md:flex-row items-center md:gap-5 gap-2">
        <p>Page 1 of 10</p>
        <div className="flex items-center gap-3">
          {buttons?.map((item, index) => (
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content={item.tip}
              key={index}
              className="p-2 border rounded hover:bg-gray-200"
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
