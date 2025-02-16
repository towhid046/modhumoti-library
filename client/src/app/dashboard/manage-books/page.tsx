'use client';
import ErrorElement from '@/components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import AddBookModal from '@/components/unique/Dashboard/Book/AddBookModal';
import BookHeader from '@/components/unique/Dashboard/Book/BookHeader';
import BookTable from '@/components/unique/Dashboard/Book/BookTable';
import UpdateBookModal from '@/components/unique/Dashboard/Book/UpdateBookModal';
import useAxiosPublic from '@/hooks/useAxios';
import { Book } from "@/lib/commonTypes";
import { useEffect, useState } from 'react';

const ManageBooks = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [books, setBooks] = useState<Book[]>([]);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState<boolean>(false);
  const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState<boolean>(false);
  const [bookId, setBookId] = useState<string>('')
  const axiosPublic = useAxiosPublic()

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
  }, [searchValue])

  let render = null;

  if (!books?.length) {
    render = (<ErrorElement text='No Book is found!!' />);
  }

  if (isLoading) {
    render = (<div className='flex items-center justify-center h-[80vh]'><LoadingSpinner size='lg' /></div>);
  }

  if (books?.length) {
    render = (<BookTable 
                books={books} 
                refetch={()=>{loadBooks()}} 
                setIsUpdateBookModalOpen={setIsUpdateBookModalOpen} 
                setBookId={setBookId}
              />);
  }

  return (
    <>
      <BookHeader 
        setIsAddBookModalOpen={setIsAddBookModalOpen} 
        bookLength={books.length} 
        setSearchValue={setSearchValue} 
        searchValue={searchValue} 
      />

      <main>
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
