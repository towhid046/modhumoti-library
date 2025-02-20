import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { toast } from "react-toastify";
import Button from './../../shared/Button/Button';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import { useNavigate } from "react-router-dom";
import useAuth from './../../../hooks/useAuth';

const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none duration-300 transition focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1 mb-3 ";

interface InputValue {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValue>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth()
  // const axiosPublic = useAxiosPublic()

  // Handle form submission
  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      // await axiosPublic.post('/users', { email })
      await login(email, password)
      toast.success('Login success!')
      navigate('/')
    } catch (err) {
      toast.error('Something went wrong!');
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        />
        {errors.email && (
          <small className="text-red-500">{errors.email.message}</small>
        )}
      </div>

      {/* Password */}
      <div className={`${inputParentClassName} relative`}>
        <label>Password:</label>
        <input
          {...register("password", { required: "Password is required" })}
          type={isPassShow ? "text" : "password"}
          placeholder="Password"
          className={commonInputClassName}
        />
        <div className="absolute top-10 right-4">
          <span
            className="cursor-pointer text-gray-600"
            onClick={() => setIsPassShow(!isPassShow)}
          >
            {isPassShow ? <FiEye /> : <GoEyeClosed />}
          </span>
        </div>
        {errors.password && (
          <small className="text-red-500">{errors.password.message}</small>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <Button isDisabled={isLoading} customClass="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
