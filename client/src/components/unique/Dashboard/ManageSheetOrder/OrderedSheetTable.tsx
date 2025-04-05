// import { Dispatch, SetStateAction } from "react";
import { useState } from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { SheetOrder } from '../../../../lib/commonTypes';
import BookOrderDetails from '../ManageBookOrder/BookOrderDetails';
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


interface BookTableProps {
    orders: SheetOrder[];
    refetch: () => void;
    // setIsUpdateBookModalOpen: Dispatch<SetStateAction<boolean>>;
    // setBookId: Dispatch<SetStateAction<string>>;
}

const OrderedSheetTable: React.FC<BookTableProps> = ({ orders, refetch }) => {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>('');
    const axiosSecure = useAxiosSecure()

    const updateBookOrderHandler = async (id: string,) => {
        try {
            const res = await axiosSecure.put(`${import.meta.env.VITE_SERVER_URL}/order-sheet/${id}`);
            if (res.status === 200) {
                toast.success('Status Updated!', { autoClose: 2000 })
                refetch();
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleCancelOrder = async (id: string) => {
        const result = await swal({
            title: "Are you sure?",
            text: "Once cancel, you will not be able to recover this order!",
            icon: "warning",
            buttons: ["Not cancel", "Yes cancel"],
            dangerMode: true,
        });

        if (result) {
            try {
                if (id) {
                    const res = await axiosSecure.delete(`${import.meta.env.VITE_SERVER_URL}/checkout-book/${id}`);
                    if (res.status === 200) {
                        toast.info('Order has canceled!', { autoClose: 2000 })
                        refetch();
                    }
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    }

    const handleCompleteOrder = async (id: string) => {
        const result = await swal({
            title: "Order Complete?",
            text: "Once complete, you will not be able to recover this order!",
            icon: "info",
            buttons: ["No", "Yes"],
            dangerMode: false,
        });

        if (result) {
            try {
                if (id) {
                    const res = await axiosSecure.put(`${import.meta.env.VITE_SERVER_URL}/checkout-book/${id}`, { status: 'Delivered' });
                    if (res.status === 200) {
                        toast.info('Order completed!', { autoClose: 2000 })
                        refetch();
                    }
                }
            } catch (error: any) {
                console.log(error);
            }
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
                            <th>Department</th>
                            <th>Year & Semester</th>
                            <th>Lecture Sheets</th>
                            <th>PDFs</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((item, index) => (
                            <tr key={item._id} className="text-center">
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.department || 'N/A'}</td>
                                <td>{item.year + '&' || ''} {item.semester || 'N/A'}</td>
                                <td>{item.lectureSheets.map(e => e.name)}</td>
                                <td className='flex items-center gap-4'>{item.pdfFiles.map((e, i) => (
                                    <Link to={e} target='_blank' className='py-2 px-4 bg-blue-300 rounded-md text-white'>{i + 1}</Link>
                                ))}</td>
                                {/* <td>{item.createdAt.toString().split('T')[0]}</td> */}
                                {/* <td>{item.totalPrice} ৳ / {item.bookIds.reduce((acc, val) => acc += val.count, 0)} </td> */}
                                {/* <td>
                                    <select
                                        onChange={(e) => updateBookOrderHandler(item._id, e.target.value)}
                                        className={`${item.status === "Pending" ? 'bg-[#00A36C]' : 'bg-[#4285F4]'} rounded-md py-1 text-white px-1.5 focus:outline-none`}
                                    >
                                        <option value="Pending" selected={item.status === 'Pending'}>Pending</option>
                                        <option value="Processing" selected={item.status === 'Processing'}>Processing</option>
                                    </select>
                                </td> */}
                                {/* <td className="flex gap-3 justify-center">
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
                                        onClick={() => handleCancelOrder(item._id)}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="Cancel"
                                    >
                                        <MdOutlineCancelScheduleSend className="text-md text-red-400" />
                                    </button>
                                    <button
                                        onClick={() => handleCompleteOrder(item._id)}
                                        className="btn bg-base-200 border btn-sm tooltip"
                                        data-tip="Complete"
                                    >
                                        <IoIosCheckmarkCircleOutline className="text-md text-green-500" />
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPreviewModalOpen && <BookOrderDetails orderId={orderId} setIsPreviewModalOpen={setIsPreviewModalOpen} />}
        </>
    )
}

export default OrderedSheetTable;