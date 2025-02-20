import { useParams } from "react-router-dom";
import useToGetPublicData from "../../hooks/useToGetPublicData";
import { Book as BookProp } from './../../lib/commonTypes';
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "../../components/shared/ErrorElement/ErrorElement";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import AddToCartBook from "../../components/unique/AddToCartBook/AddToCartBook";
import BuyNowButton from "../../components/unique/BuyNowButton/BuyNowButton";
import BookSection from "../../components/shared/BookSection/BookSection";
import useScrollToTop from "../../hooks/useScrollToTop";

const Book = () => {
    const { id } = useParams();
    useScrollToTop(id)

    const { data: book, isLoading, error } = useToGetPublicData<BookProp>(`/books/${id}`);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorElement text={error.message} />;
    if (!book) return <ErrorElement text="Book not found" />;

    const {
        title,
        _id,
        author,
        category,
        image,
        leftCount,
        price,
        publisher,
        year,
    } = book;

    return (
        <>
            <PageHeader
                title={`${title}`}
                url={`${import.meta.env.VITE_CLIENT_URL}/books/${id}`}
            />

            <section className="container mx-auto lg:pt-8 pt-4">
                <div className="px-4">
                    <div className="flex lg:gap-10 flex-col lg:flex-row gap-5 border p-5 rounded-md px-4">
                        <figure className="lg:flex-1">
                            <img
                                className="w-full h-96 object-cover rounded-md"
                                width={100}
                                height={100}
                                src={image}
                                alt={title}
                            />
                        </figure>
                        <div className="lg:flex-1 space-y-4 flex flex-col justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <p>Author: {author}</p>
                                <p>Category: {category}</p>
                            </div>
                            <hr />
                            <div className="space-y-1">
                                <p>Publish: {publisher}</p>
                                <p>Publish Year: {year}</p>
                                <p className="text-xl font-bold text-primary-color">
                                    Price: {price}{" "}
                                </p>
                                <p>Left: {leftCount} pics</p>
                            </div>
                            <hr />
                            <div className="flex items-center lg:gap-6 gap-4 sm:flex-row flex-col">
                                <AddToCartBook id={_id} />
                                <BuyNowButton id={_id} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:mt-14 sm:mt-10 mt-8'>
                    <BookSection title="Related" actionText={`${category} Books`} category={category} length={8} />
                </div>
            </section>
        </>
    );
};

export default Book;
