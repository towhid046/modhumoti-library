import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { departments } from "./sheetData";
import { toast } from "react-toastify";
import Button from "../../shared/Button/Button";
import { IoMdClose } from "react-icons/io";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const commonInputClassName =
  "w-full px-3 py-2 border rounded focus:outline-none transition duration-300 focus:border-primary-color";
const inputParentClassName = "flex flex-col gap-1";

interface InputValue {
  name: string;
  phone: string;
  department?: string;
  year?: string;
  semester?: string;
  lectureSheets: { id: number; name: string }[];
  pdfFiles: File[];
}

const years = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

const SheetOrderForm = () => {
  const { register, handleSubmit } = useForm<InputValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lectureSheets, setLectureSheets] = useState<{ id: number; name: string }[]>([]);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const axiosPublic = useAxiosPublic()

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    if (!data.name || !data.phone) {
      toast.error("Name and Phone are required");
      return;
    }
    if (lectureSheets.length === 0 && pdfFiles.length === 0) {
      toast.error("Please upload at least one PDF or add a lecture sheet");
      return;
    }
    if (data.phone.length !== 11) {
      toast.error("Phone number must be 11 digits");
      return;
    }
    if (lectureSheets.length > 0 && (!data.department || !data.year || !data.semester)) {
      toast.error("Department, Year, and Semester are required");
      return;
    }

    setIsLoading(true);

    try {
      // **Creating FormData Object**
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      if (data.department) formData.append("department", data.department);
      if (data.year) formData.append("year", data.year);
      if (data.semester) formData.append("semester", data.semester);

      // Append lectureSheets as JSON
      formData.append("lectureSheets", JSON.stringify(lectureSheets));

      // Append files
      pdfFiles.forEach((file) => {
        formData.append("pdfFiles", file);
      });

      const res = await axiosPublic.post(`/order-sheet`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      toast.success("Submitted successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Failed to submit the order");
    } finally {
      setIsLoading(false);
    }
  };


  const handleAddLectureSheet = () => {
    setLectureSheets([...lectureSheets, { id: Date.now(), name: "" }]);
  };

  const handleRemoveLectureSheet = (id: number) => {
    setLectureSheets(lectureSheets.filter((sheet) => sheet.id !== id));
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    if (event.target.files) {
      setPdfFiles([...pdfFiles, ...Array.from(event.target.files)]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded-md p-6">
      {/* PDF Upload Section */}
      <div
        className={`w-full border-2 border-dashed md:p-5 p-4 rounded-md text-center ${pdfFiles.length >= 5 && "hidden"}`}>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handlePdfUpload}
          className="hidden"
          id="pdf-upload"
          name="pdfFiles"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer bg-indigo-50 bg-opacity-60 py-2.5 px-4 rounded-md text-blue-400 md:text-lg hover:bg-indigo-100 hover:text-blue-500 duration-300">+ Upload {pdfFiles.length > 0 && 'another'} PDF</label>
      </div>

      {/* PDF Files List */}
      {pdfFiles.length > 0 && (
        <ul className="mt-2 space-y-2">
          {pdfFiles.map((file, index) => (
            <li key={index} className="flex justify-between items-center border p-2 rounded">
              {file.name}
              <span className="cursor-pointer" onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i !== index))}>
                <IoMdClose size={20} className="text-red-500" />
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Add Lecture Sheet Button */}
      {lectureSheets.length < 5 && <div onClick={handleAddLectureSheet} className="text-blue-500 mt-4 cursor-pointer w-fit">
        + Add Lecture Sheet
      </div>}

      {/* Dynamic Lecture Sheet Fields (Hidden Initially) */}
      {lectureSheets.length > 0 && (
        <div className="mt-4">
          {lectureSheets.map((sheet) =>
            <div key={sheet.id} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Teacher Name & Sheet Number"
                className={commonInputClassName}
                onChange={(e) => {
                  const updatedSheets = lectureSheets.map((s) => (s.id === sheet.id ? { ...s, name: e.target.value } : s));
                  setLectureSheets(updatedSheets);
                }
                }
                required
              />
              <button onClick={() => handleRemoveLectureSheet(sheet.id)} className="text-red-500">
                <IoMdClose size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Name & Phone Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className={inputParentClassName}>
          <strong>Your Name</strong>
          <input {...register("name", { required: true })} type="text" className={commonInputClassName} required placeholder="Your name" />
        </div>

        <div className={inputParentClassName}>
          <strong>Your Phone Number</strong>
          <input {...register("phone", { required: true })} type="tel" className={commonInputClassName} required placeholder="Phone Number" />
        </div>
      </div>

      {/* Department, Year, and Semester (Only if Lecture Sheet is Added) */}
      {lectureSheets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <select {...register("department")} className={commonInputClassName} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.name} value={dept.sortName}>{dept.name}</option>
            ))}
          </select>
          <select {...register("year")} className={commonInputClassName} required>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select {...register("semester")} className={commonInputClassName} required>
            <option value="">Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
          </select>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <Button customClass="w-full">{isLoading ? "Sending..." : "Send"}</Button>
      </div>
    </form>
  );
};

export default SheetOrderForm;
