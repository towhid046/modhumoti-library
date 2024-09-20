import SectionHeader from '@/components/shared/SectionHeader/SectionHeader'
import ViewMoreButton from "@/components/shared/ViewMoreButton/ViewMoreButton";
import BookCard from "../../shared/BookCard/BookCard";
const FictionalBooks = async () => {
  const res = await fetch("https://potterapi-fedeperin.vercel.app/en/books");
  const books = await res.json();
  
  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader
        title="Explore"
        actionText='Fictional Books'
        urlLabel='View More'
        url='/books'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books?.slice(0,4)?.map((book) => (
          <BookCard key={book?.number} book={book} />
        ))}
      </div>
      <ViewMoreButton label='More Books' url='/books'/>
    </section>
  );
};
export default FictionalBooks;
