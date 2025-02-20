import Button from '../../../shared/Button/Button';
import React, { Dispatch, SetStateAction } from 'react'
import { FiPlus } from 'react-icons/fi'

interface BookHeaderProps {
  bookLength: number;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
  setIsAddBookModalOpen: Dispatch<SetStateAction<boolean>>
}

const BookHeader: React.FC<BookHeaderProps> = ({ bookLength, setSearchValue, searchValue, setIsAddBookModalOpen }) => {

  return (
    <header className='px-4 items-center flex justify-between py-5 w-full bg-base-200 sticky top-0 z-50'>
      <div>
        <p className='px-2.5 py-1 rounded-full bg-black text-gray-100 text-sm'>Books: {bookLength}</p>
      </div>
      <form className="w-80 flex items-center gap-4 relative">
        <label
          className="md:border border-2 flex-grow px-6 py-2 transition duration-300 rounded-full flex items-center gap-2 focus-within:border-primary-color focus-within:border-opacity-50"
        >
          <input
            type="search"
            className="w-full focus:outline-none text-gray-500 bg-base-200"
            placeholder="Search by book name"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {!searchValue && <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>}
        </label>
      </form>
      <div>
        <Button clickHandler={() => setIsAddBookModalOpen(true)} customClass='flex items-center gap-2 !py-1.5 !px-3'>
          <FiPlus />
          Add Book
        </Button>
      </div>
    </header>
  )
}

export default BookHeader
