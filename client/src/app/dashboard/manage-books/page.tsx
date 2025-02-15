'use client';
import React, { useEffect, useState } from 'react'
import { Book } from "@/lib/commonTypes";
import BookHeader from '@/components/unique/Dashboard/Book/BookHeader';
import useAxiosPublic from '@/hooks/useAxios';
import BookTable from '@/components/unique/Dashboard/Book/BookTable';
import ErrorElement from '@/components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const ManageBooks = () => {
  const [searchValue, setSearchValue]= useState<string>('')
  const [isLoading, setIsLoading]= useState<boolean>(true)
  const [books, setBooks] = useState<Book[]>([]);
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true)
    }

    if(searchValue.trim().length){
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
    }else{
      const loadBooks = async () => {
        try {
          const res = await axiosPublic(`/books?search=${searchValue}`)
          setBooks(res.data)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
      loadBooks()
    }
  }, [searchValue])

  let render = null;
  
  if (!books?.length) {
    render = (
      <ErrorElement text='No Book is found!!'/>
    );
  }

  if (isLoading) {
    render = (
      <div className='flex items-center justify-center h-[80vh]'><LoadingSpinner size='lg'/></div>
    );
  }
  
  if (books?.length) {
    render = (
     <BookTable books={books} />
    );
  }

  return (
    <>
      <BookHeader bookLength={books.length} setSearchValue={setSearchValue} />
      <main>
        {render}
      </main>
    </>
  )
}

export default ManageBooks
