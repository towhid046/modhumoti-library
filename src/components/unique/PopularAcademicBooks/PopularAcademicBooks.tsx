import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import ViewMoreButton from "@/components/shared/ViewMoreButton/ViewMoreButton";
import BookCard from "../../shared/BookCard/BookCard";
import { Book } from "@/lib/commonTypes";
const PopularAcademicBooks = async ({ category }: { category: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/books/api?category=${category}`
  );
  const data = await res.text();
  const books: Book[] = JSON.parse(data);

  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader
        title="Popular"
        actionText="Academic Books"
        urlLabel="View More"
        url="/books"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books?.slice(0, 4)?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      <ViewMoreButton label="More Books" url="/books" />
    </section>
  );
};
export default PopularAcademicBooks;
