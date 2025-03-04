import { useEffect, useState } from 'react';
import { BookOrderProps } from '../../../../lib/commonTypes';
import ErrorElement from '../../../../components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner/LoadingSpinner';
import OrderedBooksTable from './../../../../components/unique/Dashboard/ManageBook/OrderedBooksTable';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const OrderedBooks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<BookOrderProps[]>([]);
    // const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState<boolean>(false);


    const axiosSecure = useAxiosSecure()

    const loadBooks = async () => {
        try {
            const res = await axiosSecure(`/checkout-book`)
            setOrders(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadBooks()
    }, [])

    let render = null;

    if (!orders?.length) {
        render = (<ErrorElement text='No Book is found!!' />);
    }

    if (isLoading) {
        render = (<div className='flex items-center justify-center h-[80vh]'><LoadingSpinner size='lg' /></div>);
    }

    if (orders?.length) {
        render = (<OrderedBooksTable
            orders={orders}
            refetch={loadBooks}
        // setIsUpdateBookModalOpen={setIsUpdateBookModalOpen}
        />);
    }

    return (
        <>
            <main className='m-2'>
                {render}
            </main>
        </>
    )
}

export default OrderedBooks;