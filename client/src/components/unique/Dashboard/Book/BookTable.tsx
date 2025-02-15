import { Book } from "@/lib/commonTypes";
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiPencil } from 'react-icons/ti';

interface BookTableProps {
  books: Book[];
}

const BookTable: React.FC<BookTableProps> = ({ books}) => {
  return (

    <div className="overflow-x-auto z-40 ">
    <table className="table">
      {/* head */}
      <thead className="bg-neutral text-neutral-content">
        <tr className="text-center">
          <th>SN.</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Author</th>
          <th>Price</th>
          <th>Left</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books?.map((book, index) => (   
          <tr key={book._id} className="text-center">
          <th>{index + 1}</th>
          <th className="flex justify-center ">
            <Image width={100} height={100} src={book.image} className="w-9 h-9 rounded object-cover" alt={book.title} />
          </th>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.price}</td>
          <td>{book.leftCount}</td>
          <td>{book.category}</td>
          <td className="flex gap-5 justify-center">
            <button
              // onClick={() => handleUpdateStudent(_id)}
              className="btn bg-base-200 border btn-sm tooltip"
              data-tip="Edit"
            >
              <TiPencil className="text-lg text-success" />
            </button>
            <button
              // onClick={() => handleRemoveStudent(_id)}
              className="btn bg-base-200 border btn-sm tooltip"
              data-tip="Delete"
            >
              <RiDeleteBin6Line className="text-lg text-error" />
            </button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
    
  )
}

export default BookTable;
