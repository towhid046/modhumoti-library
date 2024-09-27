import BookCard from "./../../components/shared/BookCard/BookCard";
import PageHeader from "./../../components/shared/PageHeader/PageHeader";
import Pagination from "../../components/unique/Pagination/Pagination";
import { Book } from "@/lib/commonTypes";
const BooksPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books/api`);
  const books: Book[] = await res.json();

  return (
    <>
      <PageHeader title="Books" url="/books" />
      <section className="container mx-auto px-4 mb-32">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books?.slice(0,8)?.map((book,index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
        <Pagination />
      </section>
    </>
  );
};

export default BooksPage;
