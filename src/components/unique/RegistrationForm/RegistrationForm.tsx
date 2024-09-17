"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import Button from "@/components/shared/Button/Button";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";

const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1 mb-3 ";

interface InputValue {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const { register, handleSubmit, errors } = useForm<InputValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  // Handle form submission
  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    console.log(data);
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
        {errors?.name && (
          <span className="text-red-500">{errors?.name?.message}</span>
        )}
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
        {errors?.email && (
          <span className="text-red-500">{errors?.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className={`${inputParentClassName} relative`}>
        <label>Password:</label>
        <input
          {...register("password")}
          required
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
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  ); 
};

export default RegistrationForm;
