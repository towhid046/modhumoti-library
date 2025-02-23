import useToGetPublicData from "../../../hooks/useToGetPublicData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorElement from "../ErrorElement/ErrorElement";
import SectionHeader from './../SectionHeader/SectionHeader';
import ViewMoreButton from './../ViewMoreButton/ViewMoreButton';
import BookCard from './../BookCard/BookCard';
import { Book } from './../../../lib/commonTypes';

interface BookSectionProps {
  category?: string;
  title: string;
  actionText: string;
  length?: number;
}

const BookSection = ({
  category,
  title,
  actionText,
  length = 4,
}: BookSectionProps) => {

  const { data: books, isLoading, error } = useToGetPublicData<Book[]>(`/books?limit=${length}&category=${category}`);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorElement text={error.message} />;

  return (
    <section className="container mx-auto px-4 mb-32">
      <SectionHeader
        title={title}
        actionText={actionText}
        urlLabel="View More"
        url="/books"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
      <ViewMoreButton label="More Books" url="/books" />
    </section>
  );
};
export default BookSection;
