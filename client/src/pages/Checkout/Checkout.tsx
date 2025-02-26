import { useState } from "react";
import { BsCash } from "react-icons/bs";
import { FaCcPaypal, FaCcStripe } from "react-icons/fa";
import Select from "react-select";
import Button from "../../components/shared/Button/Button";
import useScrollToTop from "../../hooks/useScrollToTop";
import PageHeader from './../../components/shared/PageHeader/PageHeader';
const commonInputClass = "focus:outline-none focus:border focus:border-[#2684FF] transaction duration-300 bg-transparent py-1.5 px-3 w-full border rounded outline-none";

const Checkout = () => {
    useScrollToTop()
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedThana, setSelectedThana] = useState(null);
    const [cashOnDelivery, setCashOnDelivery] = useState(true);
    const [onlinePayment, setOnlinePayment] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            district: selectedDistrict,
            thana: selectedThana,
            paymentMethod: cashOnDelivery ? "Cash on Delivery" : "Online Payment",
        };
        console.log("Submitting order:", formData);
    };

    return (
        <>
            <PageHeader title="Checkout" url='/checkout' />
            <section className="container mx-auto px-4 pb-10">
                <div className="mx-auto ">
                    <form onSubmit={handleSubmit} className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                        <div className="lg:col-span-3 md:col-span-2 rounded-md shadow-md p-6 space-y-3">
                            {/* checkout form */}
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="space-y-1 col-span-1">
                                    <label>
                                        <strong>Name</strong>
                                    </label>
                                    <input
                                        type="text"
                                        // {...register("title")}
                                        placeholder="Enter your name"
                                        className={commonInputClass}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label>
                                        <strong>Email (Optional)</strong>
                                    </label>
                                    <input
                                        type="email"
                                        // {...register("author")}
                                        placeholder="Enter your email"
                                        className={commonInputClass}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label>
                                        <strong>District</strong>
                                    </label>
                                    <Select
                                        className="border rounded"
                                        options={districts}
                                        onChange={setSelectedDistrict}
                                        isSearchable
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderWidth: state.isFocused ? "1" : "1", // Focus opacity
                                            }),
                                        }}
                                    />

                                </div>

                                <div className="space-y-1">
                                    <label>
                                        <strong>Thana</strong>
                                    </label>
                                    <Select
                                        className="border rounded"
                                        options={thanas}
                                        onChange={setSelectedThana}
                                        isSearchable
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                borderWidth: state.isFocused ? "1" : "1", // Focus opacity
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label>
                                        <strong>Street Address</strong>
                                    </label>
                                    <input
                                        type="text"
                                        // {...register("title")}
                                        placeholder="Enter your street address"
                                        className={commonInputClass}
                                        required
                                    />
                                </div>


                                <div className="space-y-1">
                                    <label>
                                        <strong>Phone Number</strong>
                                    </label>
                                    <input
                                        type="phone"
                                        // {...register("author")}
                                        placeholder="Enter your phone number"
                                        className={commonInputClass}
                                        required
                                    />
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label>
                                        <strong>Order Notes (Optional)</strong>
                                    </label>
                                    <textarea rows={4} placeholder="Note about your order, e.g. special note about your order" className={commonInputClass}></textarea>
                                </div>
                            </div>
                        </div>

                        {/* place order */}
                        <div className="lg:col-span-1 md:col-span-1 rounded-md shadow-md p-6 max-h-fit">
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={cashOnDelivery} onChange={() => setCashOnDelivery(!cashOnDelivery)} className="mr-2" />
                                    <BsCash className="text-lg mr-1" /> Cash on Delivery (COD)
                                </label>
                            </div>
                            <div className="mt-2">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={onlinePayment} onChange={() => setOnlinePayment(!onlinePayment)} className="mr-2" />
                                    Online Payment
                                </label>
                            </div>
                            {onlinePayment && (
                                <div className="mt-4 flex space-x-4">
                                    <button type="button" className="bg-blue-600 text-white px-4 py-2 flex items-center">
                                        <FaCcStripe className="mr-2" /> Pay with Stripe
                                    </button>
                                    <button type="button" className="bg-green-600 text-white px-4 py-2 flex items-center">
                                        <FaCcPaypal className="mr-2" /> Pay with SSLCOMMERZ
                                    </button>
                                </div>
                            )}
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
