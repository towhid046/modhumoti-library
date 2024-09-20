import SectionHeading from "./../../shared/SectionHeading/SectionHeading";
import Button from "./../../shared/Button/Button";
import { FaArrowTrendUp } from "react-icons/fa6";
import Link from "next/link";
import BookCard from "../../shared/BookCard/BookCard";
const PopularAcademicBooks = async () => {
  const res = await fetch("https://potterapi-fedeperin.vercel.app/en/books");
  const books = await res.json();
  
  return (
    <section className="container mx-auto px-4 mb-24">
      <SectionHeading
        title="Popular Academic Books"
        description="Explore the popular academic books"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books?.slice(0,4)?.map((book) => (
          <BookCard key={book?.number} book={book} />
        ))}
      </div>
      <div className="flex justify-center pt-8 ">
        <Link href="/books">
          <Button customClass="rounded-full flex items-center gap-4 ">
            <span>See More</span>
            <FaArrowTrendUp className="text-xl text-base-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
export default PopularAcademicBooks;
