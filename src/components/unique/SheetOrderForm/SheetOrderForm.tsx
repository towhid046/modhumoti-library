"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/shared/Button/Button";
import { departments } from "./sheetData";
import { toast } from "react-toastify";

// Common input styles
const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none  transition duration-300 focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1";

// Define form input type
interface InputValue {
  name: string;
  department: string;
  year: string;
  semester: string;
  phone: string; 
  teacher_name_sheet_number_one?: string; // Dynamically added fields (starts with 0)
  teacher_name_sheet_number_two?: string;
  teacher_name_sheet_number_three?: string;
  teacher_name_sheet_number_four?: string;
  teacher_name_sheet_number_five?: string;
}

// Constant values
const years = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
const initialItems = [
  {id: 1, name: 'teacher_name_sheet_number_one'},
  {id: 2, name: 'teacher_name_sheet_number_two'},
  {id: 3, name: 'teacher_name_sheet_number_three'},
  {id: 4, name: 'teacher_name_sheet_number_four'},
  {id: 5, name: 'teacher_name_sheet_number_five'},
];

interface ItemsProps {
  id: number;
  name: string;
}

const SheetOrderForm = () => {
  const { register, handleSubmit } = useForm<InputValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ItemsProps[]>(initialItems);

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    const { year, semester, department } = data;

    // Basic validation
    if (department === "0") {
      toast.error("Please Select Department");
      return;
    }
    if (year === "0") {
      toast.error("Please Select Year");
      return;
    }
    if (semester === "0") {
      toast.error("Please Select Semester");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate submission
      console.log(data);
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAnotherOptions = () => {
    // Add new item with an incremented id and name
    if (items.length < 5) {
      const newId = items.length + 1;
      setItems((prevItems) => [
        ...prevItems,
        { id: newId, name: `teacher_name_sheet_number_${newId===4 ? 'four' : 'five'}` },
      ]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-4 border rounded-md lg:p-8 md:p-5 p-4"
    >
      {/* Student Name */}
      <div className={inputParentClassName}>
        <label>
          <span>Your Name</span>
        </label>
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

      {/* Student Phone Number */}
      <div className={inputParentClassName}>
        <label>
          <span>Your Phone Number</span>
        </label>
        <input
          {...register("phone", {
            required: "Phone is required",
            minLength: 11,
            maxLength: 11,
          })}
          type="tel"
          placeholder="Your Phone Number"
          className={commonInputClassName}
          required
        />
      </div>

      {/* Department */}
      <div className={inputParentClassName}>
        <label>
          <span>Department:</span>
        </label>
        <select
          className={`${commonInputClassName} cursor-pointer`}
          {...register("department")}
        >
          <option value={0} className="text-gray-400">
            Select Department
          </option>
          {departments?.map((dept) => (
            <option value={dept.sortName} key={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className={inputParentClassName}>
        <label>
          <span>Year:</span>
        </label>
        <select
          className={`${commonInputClassName} cursor-pointer`}
          {...register("year")}
        >
          <option value={0} className="text-gray-400">
            Select Year
          </option>
          {years?.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Semester */}
      <div className={inputParentClassName}>
        <label>
          <span>Semester:</span>
        </label>
        <select
          className={`${commonInputClassName} cursor-pointer`}
          {...register("semester")}
        >
          <option value={0} className="text-gray-400">
            Select Semester
          </option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
        </select>
      </div>

      {/* Teacher Name & Sheet Number */}
      {items?.map((item, index) => (
        <div key={item.id} className={`${inputParentClassName} relative`}>
          <label>
            <span>
              Teacher name & Sheet Number {index !== 0 && "(Optional)"}
            </span>
          </label>
          <input
            {...register(item.name)}
            type="text"
            placeholder={`${
              index === 0 ? "Teacher Name" : "Optional Name"
            }: 1,2,3`}
            className={commonInputClassName}
            required={index === 0}
          />
          {items.length - 1 === index && (
            <div className={items.length >= 5 ? "hidden" : "relative"}>
              <span
                onClick={handleAddAnotherOptions}
                className="border cursor-pointer text-xs bg-blue-200 py-1 px-3 rounded-full"
              >
                Add Another Sheet Option
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Submit Button */}
      <div className="lg:col-span-2">
        <Button customClass="w-full">
          {isLoading ? "Processing..." : "Confirm Order"}
        </Button>
      </div>
    </form>
  );
};

export default SheetOrderForm;
