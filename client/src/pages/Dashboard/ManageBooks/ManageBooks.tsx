import { useEffect, useState } from 'react';
import ErrorElement from './../../../components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from './../../../components/shared/LoadingSpinner/LoadingSpinner';
import AddBookModal from './../../../components/unique/Dashboard/Book/AddBookModal';
import BookHeader from './../../../components/unique/Dashboard/Book/BookHeader';
import BookTable from './../../../components/unique/Dashboard/Book/BookTable';
import UpdateBookModal from './../../../components/unique/Dashboard/Book/UpdateBookModal';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import { Book } from './../../../lib/commonTypes';
import useToGetPublicData from '../../../hooks/useToGetPublicData';
import Pagination from '../../../components/unique/Pagination/Pagination';

const ManageBooks = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [books, setBooks] = useState<Book[]>([]);
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState<boolean>(false);
    const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState<boolean>(false);
    const [bookId, setBookId] = useState<string>('')
    const axiosPublic = useAxiosPublic()

    const { data, isLoading: loading } = useToGetPublicData<{ count: number }>('/books/get-count')

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [bookPerPage, setBookPerPage] = useState<number>(15)
    const totalPages = Math.ceil((data?.count || 0) / bookPerPage)

    const loadBooks = async () => {
        window.scrollTo({ top: 0 });
        setIsLoading(true)
        try {
            const res = await axiosPublic(`/books?limit=${bookPerPage}&skip=${(currentPage - 1) * bookPerPage}`)
            setBooks(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (searchValue) {
            setIsLoading(true)
        }
        if (searchValue.trim().length) {
            const loadSearchBooks = setTimeout(
                async () => {
                    try {
                        setBooks([])
                        const res = await axiosPublic(`/books?search=${searchValue}`)
                        setBooks(res.data)
                    } catch (error) {
                        console.error(error)
                    } finally {
                        setIsLoading(false)
                    }
                }
                , 800)
            return () => {
                clearTimeout(loadSearchBooks)
            }
        } else {
            loadBooks()
        }
    }, [searchValue, currentPage, bookPerPage])

    let render = null;

    if (!books?.length) {
        render = (<ErrorElement text='No Book is found!!' />);
    }

    if (isLoading || loading) {
        render = (<div className='flex items-center justify-center h-[80vh]'><LoadingSpinner size='lg' /></div>);
    }

    if (books?.length) {
        render = (
            <>
                <BookTable
                    books={books}
                    refetch={() => { loadBooks() }}
                    setIsUpdateBookModalOpen={setIsUpdateBookModalOpen}
                    setBookId={setBookId}
                />
                {!searchValue.trim() && <div className='flex justify-between items-end pb-6 px-6'>
                    <div className='flex gap-2 items-center'>
                        <p>Books per page:</p>
                        <select onChange={(e) => setBookPerPage(Number(e.target.value))} className='border rounded-md py-1 px-2 focus:outline-none' name="" id="">
                            <option value={15}>15</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </div>}
            </>
        );
    }

    return (
        <>
            <BookHeader
                setIsAddBookModalOpen={setIsAddBookModalOpen}
                bookLength={data?.count || 0}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />

            <main className='m-2'>
                {render}
            </main>

            {isAddBookModalOpen && (
                <AddBookModal
                    setIsAddBookModalOpen={setIsAddBookModalOpen}
                    refetch={() => { loadBooks() }}
                />
            )}

            {isUpdateBookModalOpen && (
                <UpdateBookModal
                    setIsUpdateBookModalOpen={setIsUpdateBookModalOpen}
                    refetch={() => { loadBooks() }}
                    bookId={bookId}
                />
            )}
        </>
    )
}

export default ManageBooks;