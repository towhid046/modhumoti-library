import { FormEvent, useEffect, useState, useMemo } from 'react';
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
import LoadingSpinner from '../../components/shared/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

const commonInputClassName = "w-full px-3 py-2 border rounded focus:outline-none duration-300 transition focus:border-primary-color my-2";

const ViewCart = () => {
    useScrollToTop();

    const [cartProducts, setCartProducts] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { bookIds, removeFromCartHandler } = useCart();
    const axiosPublic = useAxiosPublic();
    const [couponCode, setCouponCode] = useState<string>('');

    useEffect(() => {
        const loadCartProducts = async (): Promise<void> => {
            if (!bookIds?.length) {
                setCartProducts([]);
                setIsLoading(false);
                return;
            }

            try {
                const bookIdString = bookIds.map(item => item.id).join(',');
                const res = await axiosPublic.get(`${import.meta.env.VITE_SERVER_URL}/books/cart-items?ids=${bookIdString}`);
                setCartProducts(res?.data || []);
            } catch (error) {
                console.error("Error loading cart items:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCartProducts();
    }, [JSON.stringify(bookIds)]); // Ensures `useEffect` triggers only when `bookIds` actually changes

    const getItemCount = (id: string): number => {
        return bookIds.find((book) => book.id === id)?.count || 0;
    };

    const calculateSubTotal = useMemo(() => {
        return cartProducts.reduce((acc, item) => {
            const count = getItemCount(item._id);
            return acc + (item.price * count);
        }, 0);
    }, [cartProducts, bookIds]);

    const handleCouponForm = (e: FormEvent) => {
        e.preventDefault();
        console.log(couponCode);
        toast.warning(`Sorry coupon is not correct!!`, {
            position: 'top-center',
        })
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <PageHeader title='Cart' url='/cart' />
            <div className="container mx-auto px-4 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="md:col-span-2 bg-white p-6 rounded-md shadow-md">
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
                                {cartProducts.map(item => (
                                    <tr key={item._id} className="border-b text-center">
                                        <td className="flex items-center p-2">
                                            <button
                                                onClick={() => removeFromCartHandler(item._id)}
                                                className="duration-300 text-red-300 hover:text-red-500 text-2xl mr-2"
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                            <Link to={`/books/${item._id}`} className='flex items-center gap-2'>
                                                <img src={item.image} alt={item.title} className="md:w-16 w-12 h-12 md:h-16 rounded-md object-cover mr-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </td>
                                        <td className="p-2 font-semibold">{item.price} ৳</td>
                                        <td className="p-2">
                                            <ProductCounter book={item} />
                                        </td>
                                        <td className="p-2 font-semibold">{(getItemCount(item._id) * item.price).toFixed(2)} ৳</td>
                                    </tr>
                                ))}
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
                    <div className="bg-white p-6 rounded-md shadow-md max-h-fit">
                        <h2 className="text-lg font-bold border-b pb-2 mb-4">Cart Totals</h2>
                        <div className="flex justify-between border-b pb-2">
                            <span>Subtotal</span>
                            <span>{calculateSubTotal.toFixed(2)} ৳</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Shipping</span>
                            <span>00.00 ৳</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2 border-b-2 pb-2">
                            <span>Total</span>
                            <span>{calculateSubTotal.toFixed(0)} ৳</span>
                        </div>
                        <Link to={'/checkout'} className='mt-4 inline-block w-full'>
                            <Button customClass='!w-full !bg-black hover:!bg-gray-900'>
                                Proceed to Checkout
                            </Button>
                        </Link>

                        {/* Coupon Section */}
                        <form onSubmit={handleCouponForm}>
                            <div className="mt-4">
                                <h3 className="font-bold">Do you have a Coupon?</h3>
                                <input
                                    onChange={(e) => setCouponCode(e.target.value.trim())}
                                    type="text"
                                    placeholder="Coupon code"
                                    className={commonInputClassName}
                                    value={couponCode}
                                />
                                <Button customClass='!w-full' isDisabled={!couponCode}>Apply Coupon</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCart;
