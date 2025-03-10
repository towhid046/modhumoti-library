import { useEffect, useState } from 'react';
import ErrorElement from '../../components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner';
import Reveal from '../../components/shared/Reveal/Reveal';
import useScrollToTop from '../../hooks/useScrollToTop';
import useToGetPublicData from '../../hooks/useToGetPublicData';
import BookCard from './../../components/shared/BookCard/BookCard';
import PageHeader from './../../components/shared/PageHeader/PageHeader';
import Pagination from './../../components/unique/Pagination/Pagination';
import { Book } from './../../lib/commonTypes';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Books = () => {
    useScrollToTop();
    const [books, setBooks] = useState<Book[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data, isLoading: loading } = useToGetPublicData<{ count: number }>(`/books/get-count`);
    const bookPerPage = 12;
    const totalPages = Math.ceil((data?.count || 0) / bookPerPage);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const loadBooks = async () => {
            window.scrollTo({ top: 0 });
            setIsLoading(true);
            try {
                const { data } = await axiosPublic.get<Book[]>(`/books?limit=${bookPerPage}&skip=${(currentPage - 1) * bookPerPage}`);
                setBooks(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks(); // Call the function here
    }, [currentPage]);


    if (isLoading || loading) return <LoadingSpinner />;
    if (error) return <ErrorElement text={'Something went wrong'} />;

    return (
        <>
            <PageHeader title="Books" url="/books" />
            <section className="container mx-auto px-4 mb-32">
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {books?.map((book) => (
                        <Reveal key={book._id}>
                            <BookCard book={book} />
                        </Reveal>
                    ))}
                </div>
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </section>
        </>
    );
};

export default Books;
