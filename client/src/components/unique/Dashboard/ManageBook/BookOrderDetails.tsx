import React from 'react';
import { TiDelete } from 'react-icons/ti';
import useToGetPublicData from '../../../../hooks/useToGetPublicData';
import { BookOrderProps } from '../../../../lib/commonTypes';
import { formateDateAndTimeByIsoString } from '../../../../lib/formateDateAndTimeByIsoString';
import ErrorElement from '../../../shared/ErrorElement/ErrorElement';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';

interface BookOrderDetailsProps {
    orderId: string;
    setIsPreviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookOrderDetails: React.FC<BookOrderDetailsProps> = ({ orderId, setIsPreviewModalOpen }) => {
    const { data: book, isLoading, error } = useToGetPublicData<BookOrderProps>(`/checkout-book/${orderId}`);

    if (isLoading) return <LoadingSpinner height='10vh' />;
    if (error) return <ErrorElement text={error.message || 'Something went wrong!'} />;

    return (
        <div onClick={() => setIsPreviewModalOpen(false)} className='bg-black bg-opacity-30 fixed z-50 inset-0 w-full min-h-full flex items-center justify-center overflow-y-auto'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-xl'>
                <div className='text-center relative mb-6'>
                    <h2 className='text-2xl font-bold text-gray-800'>Order Details</h2>
                    <button className='absolute top-0 right-0' onClick={() => setIsPreviewModalOpen(false)}>
                        <TiDelete className='text-3xl text-red-500 hover:text-red-700' />
                    </button>
                </div>
                <div className='space-y-2 text-gray-700'>
                    <p><strong>Order ID:</strong> {book?._id}</p>
                    <p><strong>Order Date:</strong> {formateDateAndTimeByIsoString(book?.createdAt as string)}</p>
                    <p><strong>Customer:</strong> {book?.name} {book?.email && (book?.email)}</p>
                    <p><strong>Phone:</strong> {book?.phoneNumber}</p>
                    <p><strong>Delivery Address:</strong> {book?.streetAddress}, {book?.area}</p>
                    <p><strong>Delivery Option:</strong> {book?.deliveryOption}</p>
                    <p><strong>Order Notes:</strong> {book?.orderNotes || 'N/A'}</p>
                </div>
                <div className='mt-6'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>Ordered Books</h3>
                    <div className='border border-gray-300 rounded-md p-3 bg-gray-50'>
                        {book?.bookIds.map((item, index) => (
                            <div key={index} className='flex justify-between text-gray-700 py-2 border-b last:border-none'>
                                <span className='font-medium'>{item.id.title} ({item.count}x)</span>
                                <span className='font-semibold'>{(item.id.price * item.count).toFixed(2)} ৳</span>
                            </div>
                        ))}
                    </div>
                    <p className='text-right text-gray-800 font-bold mt-4 text-lg'>Total: {book?.totalPrice} ৳</p>
                </div>
            </div>
        </div>
    );
};

export default BookOrderDetails;
