import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import ViewMoreButton from "@/components/shared/ViewMoreButton/ViewMoreButton";
import BookCard from "../../shared/BookCard/BookCard";
import { Book } from "@/lib/commonTypes";
// import { books } from "../../../app/books/data";

interface BookSectionProps {
  category?: string;
  title: string;
  actionText: string;
  length?:number;
}

const BookSection = async ({
  category,
  title,
  actionText,
  length=4,
}: BookSectionProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/books/api?category=${category}`
  );
  const books: Book[] = await res.json()

  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader
        title={title}
        actionText={actionText}
        urlLabel="View More"
        url="/books"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books?.slice(0, length)?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      <ViewMoreButton label="More Books" url="/books" />
    </section>
  );
};
export default BookSection;
