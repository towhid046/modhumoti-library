// import { Dispatch, SetStateAction } from "react";
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { BookOrderProps } from '../../../../lib/commonTypes';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import BookOrderDetails from './BookOrderDetails';
import { useState } from 'react';

interface BookTableProps {
    orders: BookOrderProps[];
    // refetch: () => void;
    // setIsUpdateBookModalOpen: Dispatch<SetStateAction<boolean>>;
    // setBookId: Dispatch<SetStateAction<string>>;
}

const OrderedBooksTable: React.FC<BookTableProps> = ({ orders }) => {
    const axiosSecure = useAxiosSecure()
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>('');

    // const handleRemoveBook = async (id: string) => {
    //     const result = await swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this book!",
    //         icon: "warning",
    //         buttons: ["Cancel", "Delete"],
    //         dangerMode: true,
    //     });

    //     if (result) {
    //         try {
    //             const res = await axiosSecure.delete(`/books/${id}`);
    //             if (res.status === 200) {
    //                 // refetch();
    //                 toast.success('Book Deleted!', {
    //                     autoClose: 2000
    //                 });
    //             }
    //         } catch (error: any) {
    //             toast.error('Failed to delete book', {
    //                 autoClose: 2000
    //             });
    //         }
    //     }
    // }


    // const handleUpdateBook = (id: string) => {
    //     setIsUpdateBookModalOpen(true);
    //     setBookId(id)
    // }

    return (
        <>
            <div className="overflow-x-auto z-40 ">
                <table className="table">
                    {/* head */}
                    <thead className="bg-neutral text-neutral-content">
                        <tr className="text-center">
                            <th>SN.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Delivery Option</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((item, index) => (
                            <tr key={item._id} className="text-center">
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.area}</td>
                                <td>{item.deliveryOption}</td>
                                <td>{item.totalPrice} ৳ / {item.bookIds.length} {item.bookIds.length > 1 ? 'books' : 'book'}</td>
                                <td className="flex gap-5 justify-center">
                                    <button
                                        onClick={() => {
                                            setIsPreviewModalOpen(true)
                                            setOrderId(item._id)
                                        }}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="View Details"
                                    >
                                        <LuEye className="text-lg text-primary-color text-opacity-80" />
                                    </button>
                                    <button
                                        // onClick={() => handleRemoveBook(book._id)}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="Complete"
                                    >
                                        <IoIosCheckmarkCircleOutline className="text-lg text-green-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPreviewModalOpen && <BookOrderDetails orderId={orderId} />}
        </>
    )
}

export default OrderedBooksTable;