import LoginForm from "@/components/unique/LoginForm/LoginForm";
import SocialLogin from "@/components/unique/SocialLogin/SocialLogin";
import useToScrollTop from "@/hooks/useToScrollTop";
import Link from "next/link";
import Logo from "@/components/shared/Logo/Logo";
const LoginPage = () => {

  // useToScrollTop();

  return (
    <section className="flex items-center container mx-auto justify-center min-h-screen text-gray-700 p-4">
      <div className="flex rounded-xl bg-gray-100 flex-col lg:flex-row lg:gap-12 gap-6 lg:py-20 py-12 lg:px-16 px-6">
        <div className="flex-1 flex  flex-col lg:space-y-7 space-y-3">
          <div className="">
            <Logo />
            <h2 className="text-gray-800 lg:text-3xl mt-1 text-2xl font-bold">
              Login Now!
            </h2>
          </div>
          <p>
            Welcome to login page. Here you can login with you email and
            password or just by google account. Login to make order the books,
            stationeries, lecture sheets and so on.
          </p>
          <p>
            Don't have any account yet ?{" "}
            <Link href={"/registration"} className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>

        <div className="flex-1">
          <div className="w-full  rounded-lg">
            <LoginForm />
            <SocialLogin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
