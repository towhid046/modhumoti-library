import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Book } from "../../../lib/commonTypes";
import useCart from "../../../hooks/useCart";
import Button from "../../shared/Button/Button";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CartSidebar = () => {
  const [cartProducts, setCartProducts] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { bookIds, setIsCartShow, removeFromCartHandler, isCartShow } = useCart();
  const axiosPublic = useAxiosPublic()

  const loadCartProducts = async (): Promise<void> => {
    try {
      if (bookIds?.length) {
        const res = await axiosPublic.get(`${import.meta.env.VITE_SERVER_URL}/books/cart-items?ids=${bookIds?.map(item => item.id)}`);
        setCartProducts(res?.data);
      } else {
        setCartProducts([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCartProducts();
  }, [bookIds]);

  useEffect(() => {
    // Add or remove the cart-open class on the body element
    if (isCartShow) {
      document.body.classList.toggle('overflow-hidden', true);
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCartShow]);

  // Helper function to get the count of a specific book
  const getItemCount = (id: string): number => {
    const item = bookIds.find((book) => book.id === id);
    return item ? item.count : 0;
  };

  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-50">
      <div className="w-full md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <div
          onClick={() => setIsCartShow(false)}
          className="cursor-pointer md:min-h-screen xl:col-span-3 lg:col-span-2 md:col-span-1"
        ></div>
        <ul
          onClick={(e) => e.stopPropagation()}
          className="min-h-screen bg-base-100 p-5 col-span-1"
        >
          <div className="flex justify-between items-center mb-7">
            <h2 className="text-2xl font-semibold text-gray-600">Cart</h2>
            <button onClick={() => setIsCartShow(false)}>
              <FaTimes className="text-xl text-gray-600 hover:text-black transition duration-300" />
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center min-h-[80vh]">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          )}

          <div className="space-y-3">
            {cartProducts?.map((item: Book) => (
              <li key={item._id} className="flex justify-between items-center">
                <Link onClick={() => setIsCartShow(false)} to={`/books/${item._id}`} className="flex items-center gap-2">
                  <figure>
                    <img
                      src={item?.image}
                      className="w-12 h-10 object-cover rounded-md"
                      alt="Image"
                    />
                  </figure>
                  <div>
                    <p className="text-sm text-gray-600 mr-2">
                      {item?.title} <small className="text-gray-400 text-sm mr-1">x</small>
                      {getItemCount(item._id)} {/* Display the count here */}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-3">
                  <strong>{(item?.price * getItemCount(item._id)).toFixed(2)}৳</strong>
                  <button
                    onClick={() => removeFromCartHandler(item?._id)}
                    className="duration-300 text-red-300 hover:text-red-500 text-2xl"
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </li>
            ))}

            {cartProducts.length ? (
              <div className="flex flex-col gap-2 pt-4 border-t-2">
                <Link onClick={() => setIsCartShow(false)} to={`/cart`}>
                  <Button customClass="!w-full">View Cart</Button>
                </Link>
                <Link onClick={() => setIsCartShow(false)} to={`/checkout`}>
                  <Button customClass="!bg-gray-900 hover:!bg-black !w-full">Checkout</Button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
          {!cartProducts.length && (
            <p className="text-center text-xl font-semibold italic flex justify-center items-center min-h-[80vh]">
              No product Added Yet!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CartSidebar;