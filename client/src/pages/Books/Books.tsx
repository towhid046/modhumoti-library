import ErrorElement from '../../components/shared/ErrorElement/ErrorElement';
import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner';
import Reveal from '../../components/shared/Reveal/Reveal';
import useScrollToTop from '../../hooks/useScrollToTop';
import useToGetPublicData from '../../hooks/useToGetPublicData';
import BookCard from './../../components/shared/BookCard/BookCard';
import PageHeader from './../../components/shared/PageHeader/PageHeader';
import Pagination from './../../components/unique/Pagination/Pagination';
import { Book } from './../../lib/commonTypes';

const Books = () => {
    const { data: books, isLoading, error } = useToGetPublicData<Book[]>(`/books?limit=${12}`);
    useScrollToTop()

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorElement text={error.message} />;

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
                <Pagination />
            </section>
        </>
    );
};

export default Books;
