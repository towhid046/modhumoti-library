import { Book } from "@/lib/commonTypes";
import Image from "next/image";
import Link from 'next/link';
interface BookCardProps {
  book: Book;
}
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { image, title, author, price, year, leftCount, _id } = book
  return (
    <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/books/${_id}`} className='border rounded-md transition duration-700 hover:shadow-lg hover:border-primary-color group cursor-pointer flex flex-col justify-between'>
      <div className="px-4 pt-4">
        <figure className="relative rounded-md overflow-hidden cursor-pointer">
          <div className="absolute right-2 bottom-2 bg-primary-color py-1.5 px-2.5 text-white rounded-full text-xs z-30">
            {leftCount} Leaf
          </div>
          <Image
            width={100}
            height={100}
            src={image}
            alt={'Image'}
            className="w-full h-60 object-cover rounded-md transition duration-700 hover:scale-125"
          />
        </figure>
        <div className="py-4">
          <h2 className="text-gray-800 text-lg font-semibold">{title}</h2>
          <p className="text-gray-500 text-[14px] italic">By {author}</p>
          <p className="text-xl font-bold text-primary-color mt-2">{price} BDT</p>
        </div>
      </div>
      <div className="bg-blue-200 transition duration-700 lg:py-3 py-2 flex w-full justify-center items-center rounded-b-md cursor-pointer group-hover:bg-primary-color group-hover:text-white">
        <u className="text-[15px]">See Details</u>
      </div>
    </Link>
  );
};

export default BookCard;
