"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "@/components/shared/Button/Button";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { credentialLogin } from "./../../../app/actions/index";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none duration-300 transition focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1 mb-3 ";

interface InputValue {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<InputValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const router = useRouter();

  // Handle form submission
  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    setIsLoading(true);
    try {
      const res = await credentialLogin(data);
      if (res.error) {
        toast.error(res.error.message || "Login failed. Please try again.");
      } else {
        router.push("/");
        toast.success("Login Success");
      }
    } catch (err) {
      console.error(err);
      toast.error("Email or password not match.");
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
          required
        />
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
            className="cursor-pointer"
            onClick={() => setIsPassShow(!isPassShow)}
          >
            {isPassShow ? <FiEye /> : <GoEyeClosed />}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <Button customClass="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300">
          {isLoading ? "Login..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
