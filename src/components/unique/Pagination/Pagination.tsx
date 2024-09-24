import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const buttons = [
  MdOutlineKeyboardDoubleArrowLeft, 
  MdOutlineKeyboardArrowLeft,      
  MdOutlineKeyboardArrowRight,      
  MdOutlineKeyboardDoubleArrowRight 
];

const Pagination = () => {
  return (
    <div className="flex justify-end pt-8">
      <div className="flex flex-col md:flex-row items-center md:gap-5 gap-2">
        <p>Page 1 of 10</p>
        <div className="flex items-center gap-3">
          {buttons?.map((Icon, index) => (
            <button key={index} className="p-2 border rounded hover:bg-gray-200">
              <Icon size={24} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
