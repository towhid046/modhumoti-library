import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import Button from "../../components/shared/Button/Button";
import useScrollToTop from "../../hooks/useScrollToTop";
import PageHeader from '../../components/shared/PageHeader/PageHeader';

import axios from "axios";
import { CheckoutFormData, checkoutSchema } from "../../schemas/CheckoutSchema";

const commonInputClass = "focus:outline-none focus:border focus:border-[#2684FF] transaction duration-300 bg-transparent py-1.5 px-3 w-full border rounded outline-none";

const districts = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chattogram", label: "Chattogram" },
    { value: "Khulna", label: "Khulna" },
];

const thanas = [
    { value: "Mohammadpur", label: "Mohammadpur" },
    { value: "Banani", label: "Banani" },
    { value: "Gulshan", label: "Gulshan" },
];

const Checkout = () => {
    useScrollToTop();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });

    const onSubmit = async (data: CheckoutFormData) => {
        console.log(data);
        try {
            // const response = await axios.post("/api/checkout", data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <PageHeader title="Checkout" url='/checkout' />
            <section className="container mx-auto px-4 pb-10">
                <div className="mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-5 md:grid-cols-2 gap-6">
                        <div className="lg:col-span-3 md:col-span-2 rounded-md shadow-md p-6 space-y-3">
                            <div className="grid md:grid-cols-2 gap-3">
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
                                <div className="space-y-1">
                                    <label>
                                        <strong>District <em className="text-red-400">*</em></strong>
                                    </label>
                                    <Controller
                                        name="district"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={districts}
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
                                    {errors.district && <p className="text-red-500">District is required</p>}
                                </div>
                                <div className="space-y-1">
                                    <label>
                                        <strong>Thana <em className="text-red-400">*</em></strong>
                                    </label>
                                    <Controller
                                        name="thana"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={thanas}
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
                                    {errors.thana && <p className="text-red-500">Thana is required</p>}
                                </div>
                                <div className="space-y-1">
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
                        <div className="lg:col-span-2 md:col-span-1 rounded-md shadow-md p-6 max-h-fit">
                            <div className="mt-4 space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" defaultChecked className="mr-2" />
                                    <strong>Cash on Delivery</strong>
                                </label>
                                <p>Home delivery is done within a maximum of 4-5 days (in Dhaka) and 5-7 days (outside Dhaka).</p>
                            </div>
                            <div className="mt-4">
                                <Button customClass='!w-full !bg-black hover:!bg-gray-900'>
                                    Place Order
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
