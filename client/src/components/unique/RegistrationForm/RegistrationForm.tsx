import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { toast } from "react-toastify";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button/Button";
import useAuth from "../../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { userZodSchema } from "../../../schemas/UserSchema";

const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none  transition duration-300 focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1 mb-3";

interface InputValue {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  // const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<InputValue>({
    resolver: zodResolver(userZodSchema)
  });
  const { signUp, updateUser } = useAuth()

  // Handle form submission
  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    setIsLoading(true);
    try {
      // const res = await axiosPublic.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/registration/api`, data);
      await signUp(data.email, data.password)
      updateUser(data.name)
      toast.success("Registration Success");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className={inputParentClassName}>
        <label>Name:</label>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Your Name"
          className={commonInputClassName}
          required
        />
        {errors.name && <small className="text-red-500">{errors.name?.message}</small>}
      </div>

      {/* Email */}
      <div className={inputParentClassName}>
        <label>Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Entered value does not match email format",
            },
          })}
          type="email"
          placeholder="Your Email"
          className={commonInputClassName}
          required
        />
        {errors.email && <small className="text-red-500">{errors.email?.message}</small>}
      </div>

      {/* Password */}
      <div className={`${inputParentClassName} relative`}>
        <label>Password:</label>
        <input
          {...register("password")}
          type={isPassShow ? "text" : "password"}
          placeholder="Password"
          className={commonInputClassName}
          required
        />
        <div className="absolute top-10 right-4">
          <span
            className="cursor-pointer text-gray-600"
            onClick={() => setIsPassShow(!isPassShow)}
          >
            {isPassShow ? <FiEye /> : <GoEyeClosed />}
          </span>
        </div>
        {errors.password && <small className="text-red-500">{errors.password?.message}</small>}
      </div>

      {/* Submit Button */}
      <div>
        <Button isDisabled={isLoading} customClass="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300">
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
