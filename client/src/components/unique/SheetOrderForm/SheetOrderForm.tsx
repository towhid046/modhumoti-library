import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { departments } from "./sheetData";
import { toast } from "react-toastify";
import Button from "../../shared/Button/Button";
import { IoMdClose } from "react-icons/io";
import { AiOutlineFullscreen } from "react-icons/ai";

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
  pdfFile?: File;
}

const years = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

const SheetOrderForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<InputValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lectureSheets, setLectureSheets] = useState([{ id: 1, name: "" }]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    if (!data.name || !data.phone) {
      toast.error("Name and Phone are required");
      return;
    }
    setIsLoading(true);
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
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
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPdfPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded-md p-6">
      {/* PDF Upload Section */}
      {!pdfPreview && (
        <div className="w-full border-2 border-dashed p-4 text-center">
          <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" id="pdf-upload" />
          <label htmlFor="pdf-upload" className="cursor-pointer">Upload PDF</label>
        </div>
      )}

      {/* PDF Preview */}
      {pdfPreview && (
        <div className="relative border rounded-md p-4 flex justify-between items-center">
          <embed src={pdfPreview} className="w-full h-[50vh]" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={() => window.open(pdfPreview, "_blank")}>
              <AiOutlineFullscreen size={20} />
            </button>
            <button onClick={() => setPdfPreview(null)}>
              <IoMdClose size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Name & Phone Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className={inputParentClassName}>
          <label>Your Name</label>
          <input {...register("name", { required: true })} type="text" className={commonInputClassName} required />
        </div>

        <div className={inputParentClassName}>
          <label>Your Phone Number</label>
          <input {...register("phone", { required: true })} type="tel" className={commonInputClassName} required />
        </div>
      </div>

      {/* Dynamic Lecture Sheet Fields */}
      <div className="mt-4">
        {lectureSheets.map((sheet) => (
          <div key={sheet.id} className="flex gap-2 items-center mb-2">
            <input type="text" placeholder="Teacher Name & Sheet Number" className={commonInputClassName} required />
            <button onClick={() => handleRemoveLectureSheet(sheet.id)} className="text-red-500">
              <IoMdClose size={20} />
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddLectureSheet} className="text-blue-500">
          + Add Lecture Sheet
        </button>
      </div>

      {/* Department, Year, and Semester (Only if Lecture Sheet is Added) */}
      {lectureSheets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <select {...register("department")} className={commonInputClassName}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.name} value={dept.sortName}>{dept.name}</option>
            ))}
          </select>
          <select {...register("year")} className={commonInputClassName}>
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select {...register("semester")} className={commonInputClassName}>
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