import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "../../components/shared/Button/Button";
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import useScrollToTop from "../../hooks/useScrollToTop";
import { commonInputClassName } from "../../lib/commonInputClassName";
import { checkoutSchema } from "../../schemas/CheckoutSchema";
import useCart from "../../hooks/useCart";
import { Book } from "../../lib/commonTypes";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import swal from "sweetalert";
import ErrorElement from "../../components/shared/ErrorElement/ErrorElement";
import { useNavigate } from 'react-router-dom';

const commonInputClass = "focus:outline-none focus:border focus:border-[#2684FF] transaction duration-300 bg-transparent py-1.5 px-3 w-full border rounded outline-none";

const areas = [
    { value: "GSTU Campus", label: "GSTU Campus" },
    { value: "Gobra", label: "Gobra" },
    { value: "Nilar Mat", label: "Nilar Mat" },
    { value: "Nobinbag", label: "Nobinbag" },
    { value: "Pachuria", label: "Pachuria" },
    { value: "Gopalganj Town", label: "Gopalganj Town" },
];

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
    useScrollToTop();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });
    const [cartProducts, setCartProducts] = useState<Book[]>([]);
    const [couponCode, setCouponCode] = useState<string>('');
    const [isCouponShow, setIsCouponShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoading2, setIsLoading2] = useState<boolean>(false);
    const { bookIds, setBookIds } = useCart()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

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
    }, [JSON.stringify(bookIds)]);

    const handleCheckout = async (data: CheckoutFormData) => {
        setIsLoading2(true)
        const sendableData = { ...data, area: data.area.value, bookIds }
        try {
            if (!bookIds.length) {
                throw new Error('Book could not be empty!')
            }
            const response = await axiosPublic.post(`${import.meta.env.VITE_SERVER_URL}/checkout-book`, sendableData);
            if (response.status === 200) {
                swal('Thank You!', 'Your Order has been received, you will get them soon', 'success')
                reset()
                setBookIds([])
                localStorage.removeItem('bookIds')
                navigate('/')
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            swal('Opps!', 'Something went wrong. Contact via: 01922889898', 'error')
        } finally {
            setIsLoading2(false)
        }
    };

    const handleCouponForm = (e: FormEvent) => {
        e.preventDefault();
        console.log(couponCode);
        setIsCouponShow(false)
        setCouponCode('')
        toast.warning(`Sorry coupon is not found!!`, {
            position: 'top-center',
        })
    };

    const getItemCount = (id: string): number => {
        return bookIds.find((book) => book.id === id)?.count || 0;
    };

    const calculateSubTotal = useMemo(() => {
        return cartProducts.reduce((acc, item) => {
            const count = getItemCount(item._id);
            return acc + (item.price * count);
        }, 0);
    }, [cartProducts, bookIds]);

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (!bookIds.length) {
        return <>
            <ErrorElement text="No Product is Added!!" />
        </>
    }

    return (
        <>
            <PageHeader title="Checkout" url='/checkout' />
            <section className="container mx-auto px-4 pb-10">
                <div className="mx-auto">
                    <form onSubmit={handleCouponForm}>
                        <div className={`my-4 space-y-2 border-l-2 md:p-5 p-4 bg-white rounded-md overflow-hidden transition duration-500 ${isCouponShow ? 'h-fit' : 'h-16'}`}>
                            <h3 className="font-semibold flex items-center gap-1">
                                <p>Do you have a Coupon?</p>
                                <em className="text-primary-color cursor-pointer" onClick={() => setIsCouponShow(!isCouponShow)}>Click here</em>
                            </h3>
                            <div className={`transition ease-in-out duration-700 ${isCouponShow ? 'opacity-100' : 'opacity-0 translate-y-10'} flex items-center`}>
                                <input
                                    onChange={(e) => setCouponCode(e.target.value.trim())}
                                    type="text"
                                    placeholder="Coupon code"
                                    className={`${commonInputClassName}`}
                                    value={couponCode}
                                />
                                <Button customClass="whitespace-nowrap relative -left-1 !py-[9px]" isDisabled={!couponCode}>
                                    <p className="hidden md:flex">Apply Coupon</p>
                                    <p className="md:hidden flex">Apply</p>
                                </Button>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit(handleCheckout)} className="grid lg:grid-cols-5 md:grid-cols-2 md:gap-6 gap-4">

                        {/* User details */}
                        <div className="lg:col-span-3 md:col-span-2 rounded-md shadow-md md:p-6 p-4 space-y-3 max-h-fit">
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="md:col-span-2 w-full bg-blue-400 text-center text-white p-0.5">
                                    <em className="">We assume your location near to Gopalganj Science and Technology University (GSTU)</em>
                                </div>
                                {/* Name */}
                                <div className="space-y-1 col-span-1">
                                    <label>
                                        <strong>Name <em className="text-red-400">*</em></strong>
                                    </label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        placeholder="Enter your name"
                                        className={commonInputClass}
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label>
                                        <strong>Email (Optional)</strong>
                                    </label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="Enter your email"
                                        className={commonInputClass}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>

                                {/* Area */}
                                <div className="space-y-1">
                                    <label>
                                        <strong>Area <em className="text-red-400">*</em></strong>
                                    </label>
                                    <Controller
                                        name="area"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={areas}
                                                className="border rounded"
                                                isSearchable
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        borderWidth: state.isFocused ? "1" : "1",
                                                    }),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.area && <p className="text-red-500">Area is required</p>}
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-1">
                                    <label>
                                        <strong>Phone Number <em className="text-red-400">*</em></strong>
                                    </label>
                                    <input
                                        {...register("phoneNumber")}
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className={commonInputClass}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                                </div>

                                {/* Street Address */}
                                <div className="space-y-1 md:col-span-2">
                                    <label>
                                        <strong>Street Address <em className="text-red-400">*</em></strong>
                                    </label>
                                    <input
                                        {...register("streetAddress")}
                                        type="text"
                                        placeholder="Enter your street address"
                                        className={commonInputClass}
                                    />
                                    {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message}</p>}
                                </div>

                                {/* Order Notes */}
                                <div className="space-y-1 md:col-span-2">
                                    <label>
                                        <strong>Order Notes (Optional)</strong>
                                    </label>
                                    <textarea
                                        {...register("orderNotes")}
                                        rows={4}
                                        placeholder="Note about your order, e.g. special note about your order"
                                        className={commonInputClass}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Section */}
                        <div className="lg:col-span-2 md:col-span-1 rounded-md shadow-md md:p-6 p-4 max-h-fit">
                            <div>
                                <h2 className="text-lg font-bold mb-4">Your Order</h2>
                                <div className="flex justify-between border-b-2 pb-2">
                                    <strong>Product</strong>
                                    <strong>Sub Total</strong>
                                </div>
                                <div className="mt-2">
                                    {cartProducts?.map((item: Book) => (
                                        <li key={item._id} className="flex py-2 justify-between border-b items-center">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <p className="text-gray-500 mr-2">
                                                        {item.title} <small className="text-gray-400 text-sm mr-1">x</small>
                                                        {getItemCount(item._id)} {/* Display the count here */}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <p>{(item?.price * getItemCount(item._id)).toFixed(2)} ৳</p>
                                            </div>
                                        </li>
                                    ))}
                                </div>

                                {/* Subtotal shipping, total  */}
                                <ul>
                                    <li className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Subtotal</span>
                                        <span className="font-semibold">{calculateSubTotal.toFixed(2)} ৳</span>
                                    </li>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Shipping</span>
                                        <span className="font-semibold">00.00 ৳</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold mt-2 border-b-2 pb-2">
                                        <span>Total</span>
                                        <span>{calculateSubTotal.toFixed(0)} ৳</span>
                                    </div>
                                </ul>

                            </div>
                            <div className="mt-4 space-y-2">
                                <label htmlFor="cashOnDelivery" className="flex items-center cursor-pointer">
                                    <input {...register('deliveryOption')} value={'COD'} type="radio" id="cashOnDelivery" name="deliveryOption" className="mr-2" defaultChecked />
                                    <strong>Cash on Delivery</strong>
                                </label>
                                <em className="text-gray-400">Home delivery is done within a maximum of 1/2 days (in Gogalganj Sadar)</em>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="pickAtStore" className="flex items-center mb-1.5 cursor-pointer">
                                    <input type="radio" {...register('deliveryOption')} value={'At Shop'} id="pickAtStore" name="deliveryOption" className="mr-2" />
                                    <strong>Pick At Store</strong>
                                </label>
                                <p className="text-gray-400">Location: Balur Mat (In front of GSTU campus)</p>
                                <p className="text-gray-400">Open 9 AM - 11 PM (7 days)</p>
                            </div>


                            <div className="mt-4">
                                <Button isDisabled={isLoading2} customClass='!w-full !bg-black hover:!bg-gray-900'>
                                    {isLoading2 ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Checkout;
