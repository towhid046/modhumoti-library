import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Book } from "@/lib/commonTypes";
import Image from 'next/image';
import { Dispatch, SetStateAction } from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiPencil } from 'react-icons/ti';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

interface BookTableProps {
  books: Book[];
  refetch: () => void;
  setIsUpdateBookModalOpen: Dispatch<SetStateAction<boolean>>;
  setBookId: Dispatch<SetStateAction<string>>;
}

const BookTable: React.FC<BookTableProps> = ({ books, refetch, setIsUpdateBookModalOpen, setBookId }) => {
  const axiosSecure = useAxiosSecure()

  const handleRemoveBook = async (id: string) => {
    const result = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this book!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (result) {
      try {
        const res = await axiosSecure.delete(`/books/${id}`);
        if (res.status === 200) {
          refetch();
          toast.success('Book Deleted!', {
            autoClose: 2000
          });
        }
      } catch (error) {
        toast.error('Failed to delete book', {
          autoClose: 2000
        });
      }
    }
  }


  const handleUpdateBook = (id: string) => {
    setIsUpdateBookModalOpen(true);
    setBookId(id)
  }

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
          {[...books]?.reverse()?.map((book, index) => (
            <tr key={book._id} className="text-center">
              <th>{index + 1}</th>
              <th className="flex justify-center ">
                <Image placeholder="blur" blurDataURL='https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=600' width={100} height={100} src={book.image} className="w-9 h-9 rounded object-cover" alt={book.title} />
              </th>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.leftCount}</td>
              <td>{book.category}</td>
              <td className="flex gap-5 justify-center">
                <button
                  onClick={() => handleUpdateBook(book._id)}
                  className="btn bg-base-200 border btn-sm tooltip"
                  data-tip="Edit"
                >
                  <TiPencil className="text-lg text-primary-color text-opacity-80" />
                </button>
                <button
                  onClick={() => handleRemoveBook(book._id)}
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