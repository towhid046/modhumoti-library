import { Link } from "react-router-dom";
import Logo from "../../components/shared/Logo/Logo";
import useScrollToTop from "../../hooks/useScrollToTop";
import RegistrationForm from "../../components/unique/RegistrationForm/RegistrationForm";
import SocialLogin from "../../components/unique/SocialLogin/SocialLogin";

const Registration = () => {
    useScrollToTop()
    return (
        <section className="flex items-center container mx-auto justify-center min-h-screen text-gray-700 p-4">
            <div className="flex rounded-xl bg-gray-100 flex-col lg:flex-row lg:gap-12 gap-6 lg:py-20 py-12 lg:px-16 px-6">
                <div className="flex-1 flex  flex-col lg:space-y-7 space-y-3">
                    <div className="">
                        <Logo />
                        <h2 className="text-gray-800 lg:text-3xl mt-1 text-2xl font-bold">
                            Registration Now!
                        </h2>
                    </div>
                    <p>
                        Welcome to Registration page. Here you can registration with you email and
                        password and photo (optional) or just by google account. Registration to make order the books,
                        stationeries, lecture sheets and so on.
                    </p>
                    <p>
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-blue-500 underline">
                            Login
                        </Link>
                    </p>
                </div>

                <div className="flex-1">
                    <div className="w-full  rounded-lg">
                        <RegistrationForm />
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;