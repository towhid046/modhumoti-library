import { useParams } from "react-router-dom";
import BookSection from "../../components/shared/BookSection/BookSection";
import ErrorElement from "../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import BuyNowButton from "../../components/unique/AddToCartBook/AddToCartButton";
import useScrollToTop from "../../hooks/useScrollToTop";
import useToGetPublicData from "../../hooks/useToGetPublicData";
import { Book as BookProp } from './../../lib/commonTypes';
import useCart from "../../hooks/useCart";

const Book = () => {
    const { id } = useParams();
    useScrollToTop(id)
    const { incrementCount, decrementCount, bookIds } = useCart()
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

    const itemCount = bookIds.find(item => item.id === _id)

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
                                {/* Quantity Selector */}
                                <div className="flex-1 w-full flex items-center border border-gray-300 px-4 py-[5px] rounded-md justify-between">
                                    <button
                                        className="w-7 h-7 flex items-center justify-center disabled:cursor-not-allowed border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                        aria-label="Decrease quantity"
                                        onClick={() => decrementCount(_id)}
                                        disabled={bookIds.map(item => item.id).includes(_id) === false}
                                    >
                                        -
                                    </button>
                                    <div className="mx-4 text-lg font-semibold">{itemCount?.count || 0}</div>
                                    <button
                                        className="w-7 h-7 flex items-center justify-center disabled:cursor-not-allowed border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                        aria-label="Increase quantity"
                                        onClick={() => incrementCount(_id)}
                                        disabled={itemCount?.count === leftCount}
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Buy Now Button */}
                                <div className="w-full flex-1">
                                    <BuyNowButton id={_id} />
                                </div>
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
