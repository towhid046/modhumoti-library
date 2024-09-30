import Button from "@/components/shared/Button/Button";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { Book } from "@/lib/commonTypes";
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";

const BookDetailsPage = async (request) => {
  const { id } = request?.params;
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
        title={title}
        url={`${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`}
      />
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center lg:gap-10 flex-col lg:flex-row gap-5">
          <figure className="lg:flex-1">
            <Image
              className="w-full h-96 object-cover"
              width={100}
              height={100}
              src={image}
              alt={title}
            />
          </figure>
          <div className="lg:flex-1 space-y-4 p-5 border rounded-md">
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
            <div className="flex items-center lg:gap-6 gap-4 lg:flex-row flex-col">
              <Button customClass="flex-1 justify-center flex items-center gap-4">
                Add to cart
                <BsCartPlus />
              </Button>

                <Button customClass='flex-1'>Buy Now</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookDetailsPage;
