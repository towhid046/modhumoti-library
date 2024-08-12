import Products from "./../../components/unique/Products/Products";
import SectionHeading from "./../../components/shared/SectionHeading/SectionHeading";
import Product from "./../../components/unique/Products/Product/Product";
import Button from "./../../components/shared/Button/Button";

const products: number[] = [1, 2, 3, 4, 5, 6, 7, 9, 9];
import React from 'react'
const ProductsPage:React.FC = () => {
  return (
    <section className="container mx-auto mb-12">
      <SectionHeading title="Products" description="Discover Your Medicine" />
      <div className="grid xl:grid-cols-4 px-4 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <Product key={product} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
