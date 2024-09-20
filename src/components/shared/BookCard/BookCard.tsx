import Image from "next/image";
interface BookCardProps {
  number: number;
  cover:string;
  title:string;
}
const BookCard = ({ book }:BookCardProps) => {
  return (
    <div key={book.number} className="border rounded-md">
      <div className="px-4 pt-4">
        <figure className="relative rounded-md overflow-hidden">
          <div className="absolute right-2 bottom-2 bg-primary-color  py-1.5 px-2.5 text-white rounded-full text-xs z-30">
            6 Leaf
          </div>
          <Image
            width={100}
            height={100}
            src={book?.cover}
            alt={book?.number}
            className="w-full h-60 object-cover rounded-md transition duration-700 hover:scale-125 "
          />
        </figure>
        <div className="py-4">
          <h2 className="text-gray-800 text-lg font-semibold">{book?.title}</h2>
          <p className="text-gray-500">By Writer Name</p>
          <p className="text-xl font-bold text-primary-color mt-2">160 BDT</p>
        </div>
      </div>
      <div className="bg-blue-200 transition duration-500 py-3 flex w-full justify-center items-center rounded-b-md cursor-pointer hover:bg-primary-color hover:text-white">
        <u className="text-[15px]">See Details</u>
      </div>
    </div>
  );
};

export default BookCard;
