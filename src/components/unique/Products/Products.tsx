import Link from "next/link";
import Button from "./../../shared/Button/Button";
import Product from "./Product/Product";
import SectionHeading from "./../../shared/SectionHeading/SectionHeading";

const products: number[] = [1, 2, 3, 4, 5, 6, 7, 9, 9];
const Products = () => {
  return (
    <section className="container mx-auto py-12">
      <SectionHeading title="Products" description="Discover Your Medicine" />
      <div className="grid xl:grid-cols-4 px-4 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products?.slice(0, 8)?.map((product) => (
          <Product key={product} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-7">
        <Link href="/products">
          <Button>View More</Button>
        </Link>
      </div>
    </section>
  );
};
export default Products;
