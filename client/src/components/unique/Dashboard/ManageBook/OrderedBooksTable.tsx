// import { Dispatch, SetStateAction } from "react";
import { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { BookOrderProps } from '../../../../lib/commonTypes';
import BookOrderDetails from './BookOrderDetails';
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';


interface BookTableProps {
    orders: BookOrderProps[];
    refetch: () => void;
    // setIsUpdateBookModalOpen: Dispatch<SetStateAction<boolean>>;
    // setBookId: Dispatch<SetStateAction<string>>;
}

const OrderedBooksTable: React.FC<BookTableProps> = ({ orders, refetch }) => {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>('');
    const axiosSecure = useAxiosSecure()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    const updateBookOrderHandler = async (id: string, status: string) => {
        try {
            if (status) {
                const res = await axiosSecure.put(`${import.meta.env.VITE_SERVER_URL}/checkout-book/${id}`, { status });
                if (res.status === 200) {
                    toast.success('Status Updated!', { autoClose: 2000 })
                    refetch();
                }
            }
        } catch (error: any) {
            console.log(error);
        }
    }


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
                            <th>Order Date</th>
                            <th>Price</th>
                            <th>Status</th>
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
                                <td>{item.createdAt.toString().split('T')[0]}</td>
                                <td>{item.totalPrice} ৳ / {item.bookIds.reduce((acc, val) => acc += val.count, 0)} </td>
                                <td>
                                    <select onChange={(e) => updateBookOrderHandler(item._id, e.target.value)} className={`${item.status === "Pending" ? 'bg-[#00A36C]' : 'bg-[#4285F4]'} rounded-md py-1 text-white px-1.5`} name="" id="">
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                    </select>
                                </td>
                                <td className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => {
                                            setIsPreviewModalOpen(true)
                                            setOrderId(item._id)
                                        }}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="View Details"
                                    >
                                        <LuEye className="text-md text-opacity-80" />
                                    </button>
                                    <button
                                        // onClick={() => handleRemoveBook(book._id)}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="Cancel"
                                    >
                                        <MdOutlineCancelScheduleSend className="text-md text-red-400" />
                                    </button>
                                    <button
                                        // onClick={() => handleRemoveBook(book._id)}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="Complete"
                                    >
                                        <IoIosCheckmarkCircleOutline className="text-md text-green-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPreviewModalOpen && <BookOrderDetails orderId={orderId} setIsPreviewModalOpen={setIsPreviewModalOpen} />}
        </>
    )
}

export default OrderedBooksTable;