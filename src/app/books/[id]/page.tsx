import Button from "@/components/shared/Button/Button";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { Book } from "@/lib/commonTypes";
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";
import BookSection from './../../../components/shared/BookSection/BookSection';

const BookDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  if (!id) {
    return { message: "Id is required!" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/books/api/${id}`
  );
  const book: Book = await res.json();
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
        url={`${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`}
      />
      <section className="container mx-auto lg:pt-8 pt-4 px-4">
        <div className="flex  lg:gap-10 flex-col lg:flex-row gap-5 border p-5 rounded-md px-4">
          <figure className="lg:flex-1">
            <Image
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
              <Button customClass="sm:flex-1 justify-center flex items-center gap-4 w-full">
                Add to cart
                <BsCartPlus />
              </Button>

              <Button customClass='sm:flex-1 w-full'>Buy Now</Button>
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

export default BookDetailsPage;
