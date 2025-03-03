import { useEffect, useState } from 'react';
import { Book } from '../../../../lib/commonTypes';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import ErrorElement from '../../../../components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner/LoadingSpinner';
import OrderedBooksTable from './../../../../components/unique/Dashboard/ManageBook/OrderedBooksTable';

const OrderedBooks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [books, setBooks] = useState<Book[]>([]);
    const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState<boolean>(false);
    const [bookId, setBookId] = useState<string>('')
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const res = await axiosPublic(`/books`)
                setBooks(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        loadBooks()
    }, [])

    let render = null;

    if (!books?.length) {
        render = (<ErrorElement text='No Book is found!!' />);
    }

    if (isLoading) {
        render = (<div className='flex items-center justify-center h-[80vh]'><LoadingSpinner size='lg' /></div>);
    }

    if (books?.length) {
        render = (<OrderedBooksTable
            books={books}
            refetch={() => { }}
            setIsUpdateBookModalOpen={setIsUpdateBookModalOpen}
            setBookId={setBookId}
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