import { useEffect, useState } from 'react';
import ErrorElement from '../../../../components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner/LoadingSpinner';
import OrderedBooksTable from '../../../../components/unique/Dashboard/ManageBookOrder/OrderedBooksTable';
import Pagination from '../../../../components/unique/Pagination/Pagination';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useToGetPublicData from '../../../../hooks/useToGetPublicData';
import { BookOrderProps } from '../../../../lib/commonTypes';

const OrderedBooks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<BookOrderProps[]>([]);
    const axiosSecure = useAxiosSecure()

    const { data } = useToGetPublicData<{ count: number }>('/checkout-book/ordered-book-count')

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [bookPerPage, setBookPerPage] = useState<number>(10)
    const totalPages = Math.ceil((data?.count || 0) / bookPerPage)

    const loadBooks = async () => {
        try {
            const res = await axiosSecure(`/checkout-book?limit=${bookPerPage}&skip=${(currentPage - 1) * bookPerPage}`)
            setOrders(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadBooks()
    }, [currentPage, bookPerPage])

    let render = null;

    if (!orders?.length) {
        render = (<ErrorElement text='No Book is found!!' />);
    }

    if (isLoading) {
        render = (<div className='flex items-center justify-center h-[80vh]'><LoadingSpinner size='lg' /></div>);
    }

    if (orders?.length) {
        render = (
            <>
                <OrderedBooksTable
                    orders={orders}
                    refetch={loadBooks}
                />
                <div className='flex justify-between items-end pb-6 px-6'>
                    <div className='flex gap-2 items-center'>
                        <p>Books per page:</p>
                        <select onChange={(e) => setBookPerPage(Number(e.target.value))} className='border rounded-md py-1 px-2 focus:outline-none' name="" id="">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </div>
            </>
        );
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