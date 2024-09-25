"use client";
import Button from "@/components/shared/Button/Button";
import PageHeader from "@/components/shared/PageHeader/PageHeader";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const commonInputClassName = "w-full px-3 py-2 border rounded focus:outline-none  transition duration-300 focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1 mb-3";

interface InputValue {
  name: string;
  department: string;
  year: string;
  semester: string;
  teacherName: string;
}

const years = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

const SheetsPage = () => {
  const { register, handleSubmit } = useForm<InputValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Sheets" url="/sheets" />
    <section className="container mx-auto px-4">
      <div className='py-12'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
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
          </div>

          {/* Department */}
          <div className={inputParentClassName}>
            <label>Department:</label>
            <input
              {...register("department", {
                required: "Department is required",
              })}
              type="text"
              placeholder="Your Name"
              className={commonInputClassName}
              required
            />
          </div>

          {/* Year */}
          <div className={inputParentClassName}>
            <label>Year:</label>
            <select className={`${commonInputClassName} cursor-pointer`} {...register("year")}>
              <option value={0}>Select Year</option>
              {years?.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className={inputParentClassName}>
            <label>Semester:</label>
            <select className={`${commonInputClassName} cursor-pointer`} {...register("semester")}>
              <option value={0}>Select Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <Button customClass="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300">
              {isLoading ? "Processing..." : "Confirm Order"}
            </Button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
};

export default SheetsPage;
