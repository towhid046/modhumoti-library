import { useEffect, useState } from 'react';
import PageHeader from './../../components/shared/PageHeader/PageHeader';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useCart from '../../hooks/useCart';
import ProductCounter from '../../components/shared/ProductCounter/ProductCounter';
import { Book } from '../../lib/commonTypes';
import useScrollToTop from '../../hooks/useScrollToTop';
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import Button from './../../components/shared/Button/Button';
import { GoArrowLeft } from "react-icons/go";

const ViewCart = () => {
    useScrollToTop()

    const [cartProducts, setCartProducts] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { bookIds, setIsCartShow, removeFromCartHandler, isCartShow } = useCart();
    const axiosPublic = useAxiosPublic()

    const loadCartProducts = async (): Promise<void> => {
        try {
            if (bookIds?.length) {
                const res = await axiosPublic.get(`${import.meta.env.VITE_SERVER_URL}/books/cart-items?ids=${bookIds?.map(item => item.id)}`);
                setCartProducts(res?.data)
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

    const getItemCount = (id: string): number => {
        const item = bookIds.find((book) => book.id === id);
        return item ? item.count : 0;
    };

    return (
        <>
            <PageHeader title='Cart' url='/cart' />
            <div className="container mx-auto px-4 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <table className="w-full border-collapse mb-5">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-center p-2">Product</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Sample Cart Item */}
                                {cartProducts?.map(item => (
                                    <tr key={item._id} className="border-b text-center">
                                        <td className="flex items-center p-2">
                                            <button
                                                onClick={() => removeFromCartHandler(item?._id)}
                                                className="duration-300 text-red-300 hover:text-red-500 text-2xl mr-2"
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                            <Link to={`/books/${item._id}`} className='flex items-center gap-2'>
                                                <img src={item.image} alt="Product" className="md:w-16 w-12  h-12 md:h-16 rounded-md object-cover mr-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </td>
                                        <td className="p-2 font-semibold">{item.price}</td>
                                        <td className="p-2">
                                            <ProductCounter book={item} />
                                        </td>
                                        <td className="p-2 font-semibold">{getItemCount(item._id) * item.price}</td>
                                    </tr>
                                ))}
                                {/* Add more items dynamically */}
                            </tbody>
                        </table>
                        <Link to={'/books'}>
                            <Button customClass='flex items-center gap-2 !bg-transparent !text-black !border border-primary-color border-opacity-60 hover:border-opacity-90'>
                                <GoArrowLeft />
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold border-b pb-2 mb-4">Cart Totals</h2>
                        <div className="flex justify-between border-b pb-2">
                            <span>Subtotal</span>
                            <span>5,875.00৳</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Shipping</span>
                            <span>60.00৳</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2">
                            <span>Total</span>
                            <span>5,935.00৳</span>
                        </div>
                        <button className="mt-4 w-full bg-black text-white py-2 rounded">Proceed to Checkout</button>
                        {/* Coupon Section */}
                        <div className="mt-4">
                            <h3 className="font-bold">Coupon</h3>
                            <input type="text" placeholder="Coupon code" className="w-full border p-2 mt-2" />
                            <button className="mt-2 w-full bg-gray-700 text-white py-2 rounded">Apply Coupon</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewCart;
