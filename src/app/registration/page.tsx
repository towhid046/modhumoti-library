"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();
  // const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const res = await axiosInstance.post("/users", data);
    //   if (res.data.insertedId) {
    //     toast.success("Your account created Successfully! Please Login", {
    //       position: "top-center",
    //     });
    //     navigate("/login");
    //   }
    // } catch (error) {
    //   toast.error(error?.response?.data?.message, {
    //     position: "top-center",
    //   });
    // }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-2">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
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
              id="name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-color"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Your name"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-color"
            />
            {errors.email && (
              <span className="text-red-500">Valid email is required</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Photo</label>
            <input
              type="file"
              {...register("photoFile", {
                required: true,
              })}
              className="w-full cursor-pointer px-3 py-1.5 border rounded-lg focus:outline-none focus:border-primary-color"
            />
            {errors.photoFile && (
              <span className="text-red-500">PhotoFile is required</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              Password
            </label>
            <input
              type="password"
              placeholder="Create password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-color"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
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
