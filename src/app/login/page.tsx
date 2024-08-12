"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();
  // const { setUser, setLoading, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    // setIsLoading(true);
    // try {
    //   const res = await axiosInstance.get(
    //     `/user-login?mobile=${data.mobile}&pin=${data.pin}`
    //   );
    //   if (res.data.email) {
    //     const resp = await axiosInstance.post(
    //       "/jwt",
    //       { email: res?.data?.email },
    //       { withCredentials: true }
    //     );
    //     if (resp.data.success) {
    //       localStorage.setItem("user", JSON.stringify(res.data));
    //       // setUser(res.data);
    //       // setLoading(false);

    //       toast.success("Login Success", {
    //         position: "top-center",
    //       });

    //       if (res.data.applyFor === "User") {
    //         // navigate("/user-dashboard");
    //         // setIsLoading(false);
    //         return;
    //       }
    //       if (res.data.applyFor === "Agent") {
    //         // navigate("/agent-dashboard");
    //         setIsLoading(false);
    //         return;
    //       }
    //       if (res.data.role === "Admin") {
    //         // navigate("/admin-dashboard");
    //       }
    //     }
    //   }
    // } catch (error) {
    //   // toast.error(error?.response?.data?.message, {
    //   //   position: "top-center",
    //   // });
    // } finally {
    //   // setLoading(false);
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-2">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="mobile">
              Email
            </label>
            <input
              type="email"
              placeholder="Type your email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              Password
            </label>
            <input
              type="password"
              placeholder="Type your password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
          >
            {isLoading ? "Login..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Have not registered yet?
          <Link
            href="/registration"
            className="text-gray-800 hover:text-gray-600 underline ml-1"
          >
            Please Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
