import { FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookIdContext } from "@/providers/BookInfoProvider";
import {Book} from '@/lib/commonTypes'

const CartItem = () => {
    const [cartProducts, setCartProducts] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { bookIds, setIsCartShow } = useContext(BookIdContext);

  const loadCartProducts = async (): Promise<void> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart-items?ids=${bookIds.join(',')}`);
      if(res.data?.length){
          setCartProducts(res?.data);
        }else{
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

  const removeIdFromCart = (id: string): void => {
    // handleRemoveProduct(id);
    loadCartProducts();
  };

  return (
    <div
    className="fixed top-0 left-0 w-full min-h-screen z-50">
      <div className="w-full md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <div
      onClick={() => setIsCartShow(false)}
          className="cursor-pointer md:min-h-screen bg-black bg-opacity-80 xl:col-span-3 lg:col-span-2 md:col-span-1"
        ></div>
        <ul 
    onClick={(e) => e.stopPropagation()}
        className="min-h-screen bg-base-100 p-5 col-span-1 ">
          <div className="flex justify-between items-center mb-7">
            <h2 className="text-2xl font-semibold text-gray-600">Cart</h2>
            <button
              onClick={() => setIsCartShow(false)}
            >
              <FaTimes className="text-xl text-gray-600 hover:text-red-400 transition duration-300" />
            </button>
          </div>

          {isLoading && (
            <div className=" flex justify-center items-center min-h-[80vh]">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          )}

          <div className="space-y-3">
            {cartProducts?.map((item: any) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <figure>
                      <img
                        src={item?.image}
                        className="w-12 h-10 object-cover rounded-lg"
                        alt="Image"
                      />
                    </figure>
                    <div>
                      <p className="text-sm text-gray-600">{item?.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <strong>${item?.price}</strong>
                    <button
                      //   onClick={() => removeIdFromCart(item?._id)}
                      className="btn btn-sm btn-outline"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </li>
              ))}
          </div>
          {!bookIds.length && (
            <p className="text-center text-xl font-semibold italic flex justify-center items-center min-h-[80vh]">
              No product Added Yet!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CartItem;
