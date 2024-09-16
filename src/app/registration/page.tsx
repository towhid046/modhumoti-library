"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface OnsubmitProps {
  name: string;
  img: string;
  email: string;
  password: string;
}

function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();
  const router = useRouter();

  const onSubmit = async (data: OnsubmitProps): Promise<void> => {
    try {
      const res = await axiosInstance.post("/registration/api", data);

      if (res.data.insertedId) {
        toast.success(
          "Your account created Successfully! Check Email to verify Account",
          {
            position: "top-center",
          }
        );
        reset();
        router.push("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-2">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              required
              id="name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color"
            />
            {errors.name && (
              <small className="text-red-500">Name is required</small>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              required
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color"
            />
            {errors.email && (
              <small className="text-red-500">Valid email is required</small>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Photo Url</label>
            <input
              type="text"
              {...register("img", {
                required: true,
              })}
              required
              placeholder="Photo Url"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color"
            />
            {errors.img && (
              <small className="text-red-500">Photo Url is required</small>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Create password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a number",
                },
              })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color"
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Already registered?
          <Link
            href="/login"
            className="text-gray-800 hover:text-gray-600 underline ml-1"
          >
            Please Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
