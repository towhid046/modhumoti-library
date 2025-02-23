import React, { FC, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Book } from "../../../../lib/commonTypes";
interface SearchBookProps {
  setIsSearchClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBook: FC<SearchBookProps> = ({ setIsSearchClicked }) => {
  const axiosPublic = useAxiosPublic()
  const [searchText, setSearchText] = useState<string>('')
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (searchText) {
      setIsLoading(true)
    }
    const loadSearchBooks = setTimeout(
      async () => {
        try {
          setBooks([])
          if (searchText.trim().length) {
            const res = await axiosPublic(`/books?search=${searchText.trim()}`)
            setBooks(res.data)
          }
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
      , 800)
    return () => {
      clearTimeout(loadSearchBooks)
    }
  }, [searchText])

  let render: any;

  if (books.length) {
    render = <ul className="flex flex-col pt-5 space-y-2">
      {books && books?.slice(0, 5)?.map((book, index) => (
        <li onClick={() => setSearchText('')} key={book._id} className={`${index !== books.length - 1 && 'border-b'} `}>
          <Link
            to={`/books/${book._id}`}
            className='pb-3 px-5 flex items-center w-full gap-4 justify-between hover:text-primary-color transition duration-300'
          >
            <figure>
              <img width={100} height={100} src={book?.image} alt={book?.title} className='sm:h-10 h-8 w-8 sm:w-10 rounded-md object-cover ' />
            </figure>
            <div className='flex items-center justify-between gap-4 flex-grow'>
              <div className="flex flex-col">
                <p className='font-semibold sm:text-md text-[15px]'>
                  {book?.title}
                </p>
                <em className='sm:text-[14px] text-[13px]'>{book?.author}</em>
              </div>
              <span className='text-primary-color sm:text-[17px] sm:font-semibold font-md text-[15px]'>
                ${book?.price}
              </span>
            </div>

          </Link>
        </li>
      ))}
    </ul>
  }
  if (!books.length && searchText && !isLoading) {
    render = <p className='text-gray-400 p-5 italic text-center'>Opps! Book Not Found</p>
  }

  if (isLoading) {
    render = <div className="p-5"> <LoadingSpinner height="50vh" size="sm" /></div>
  }

  return (
    <form className="w-full flex items-center gap-4 relative" onSubmit={(e) => e.preventDefault()}>
      <div
        onClick={() => setIsSearchClicked && setIsSearchClicked(false)}
        className="md:hidden inline-block cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      <label
        className="md:border border-2 flex-grow px-6 py-2 transition duration-300 rounded-full flex items-center gap-2 focus-within:border-primary-color focus-within:border-opacity-50"
      >
        <input
          type="search"
          className="w-full focus:outline-none text-gray-500"
          placeholder="Search by book name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        {!searchText && <svg
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
      <div className="absolute top-12 bg-white rounded-md shadow-lg w-full">
        {render}
      </div>
    </form>

  );
};

export default SearchBook;
