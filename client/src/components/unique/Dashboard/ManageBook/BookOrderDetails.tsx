import React from 'react'
import { BookOrderProps } from '../../../../lib/commonTypes'
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import useToGetPublicData from '../../../../hooks/useToGetPublicData';
import ErrorElement from '../../../shared/ErrorElement/ErrorElement';

interface BookOrderDetailsProps {
    orderId: string;
}

const BookOrderDetails: React.FC<BookOrderDetailsProps> = ({ orderId }) => {
    const axiosSecure = useAxiosSecure()
    const { data: book, isLoading, error } = useToGetPublicData<BookOrderProps>(`/checkout-book/${orderId}`)
    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorElement text={error.message || 'Something went wrong!'} />
    }
    return (
        <div className='bg-black bg-opacity-30 fixed z-50 inset-0 w-full min-h-full flex items-center justify-center '>
            <div className='bg-white p-8 rounded-md'>
                BookOrderDetails: {orderId || 'No Name'}
            </div>
        </div>
    )
}

export default BookOrderDetails