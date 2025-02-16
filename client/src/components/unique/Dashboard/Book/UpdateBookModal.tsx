'use client';

import Button from "@/components/shared/Button/Button";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "@/hooks/useAxios";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useToGetImageUrl from "@/hooks/useToGetImgUrl";
import { bookZodSchema } from "@/schemas/BookSchema";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TiDelete } from "react-icons/ti";
import swal from "sweetalert";
import { z } from "zod";
const commonInputClass = "focus:outline-none focus:border focus:border-primary-color bg-transparent py-1.5 px-3 w-full border rounded outline-none";

interface AddBookFormValues {
    title: string;
    image: FileList | File[];
    author: string;
    leftCount: number;
    price: number;
    publisher: string;
    year: number;
    isbn: string;
    category: string;
}

interface AddBookProps {
    setIsUpdateBookModalOpen: Dispatch<SetStateAction<boolean>>;
    refetch: () => void;
    bookId:string
}

const UpdateBookModal = ({ setIsUpdateBookModalOpen, refetch, bookId }: AddBookProps) => {
    const { register, handleSubmit, setValue } = useForm<AddBookFormValues>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoading2, setIsLoading2] = useState<boolean>(true);
    const getImageUrl = useToGetImageUrl();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        const fetchBook = async () => {
            try {
                const res = await axiosPublic.get(`/books/${bookId}`);
                const book = res.data;
                setValue("title", book.title);
                setValue("author", book.author);
                setValue("leftCount", book.leftCount);
                setValue("price", book.price);
                setValue("publisher", book.publisher);
                setValue("year", book.year);
                setValue("isbn", book.isbn);
                setValue("category", book.category);
            } catch (error) {
                console.log(error);
            }finally{
                setIsLoading2(false)
            }
        };  
        fetchBook();
    },[])
    
    const handleUpdateBookForm: SubmitHandler<AddBookFormValues> = async (data) => {
        setIsLoading(true);
        try {
            const imgUrl = await getImageUrl(data.image);
            data.image = imgUrl;

            const sendableData = {
                ...data,
                leftCount: Number(data.leftCount),
                price: Number(data.price),
                year: Number(data.year),
            };

            try {
                // Validate the data using Zod
                const validatedData = bookZodSchema.parse(sendableData);
                const res = await axiosSecure.put(`/books/${bookId}`, validatedData);

                if (res?.status === 200) {
                    swal("Updated", "Book updated successfully", "success");
                    setIsUpdateBookModalOpen(false);
                    refetch();
                }
            } catch (validationError) {
                if (validationError instanceof z.ZodError) {
                    validationError.errors.forEach((err) => {
                        swal("Validation Error", `${err.message}`, "error");
                    });
                } else {
                    throw validationError;
                }
            }
        } catch (error: any) {
            console.log(error.message);
            swal("Oops! Error", error.message || "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed left-0 min-h-screen top-0 z-50 bg-black bg-opacity-70 w-full flex justify-center items-center">
            <div
                onClick={(e) => e.stopPropagation()}
                className="max-w-xl mx-auto bg-white p-6 border border-gray-200 rounded"
            >
                {isLoading2 ?
                    <LoadingSpinner/>
                    :
                <>
                    <div className="text-center relative mb-4">
                    <h2 className="text-2xl font-bold ">Update Book</h2>
                    <button className="absolute -top-3 -right-3" onClick={() => setIsUpdateBookModalOpen(false)}>
                        <TiDelete className="text-3xl text-red-400" />
                    </button>
                    </div>
                    <form
                    onSubmit={handleSubmit(handleUpdateBookForm)}
                    className="grid lg:grid-cols-2 gap-3 grid-cols-1"
                >
                    <div className="space-y-1 col-span-2">
                        <label>
                            <strong>Image</strong>
                        </label>
                        <input
                            type="file"
                            {...register("image")}
                            placeholder="Choose Book Image"
                            className={`${commonInputClass} !py-1`}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>Book Name</strong>
                        </label>
                        <input
                            type="text"
                            {...register("title")}
                            placeholder="Enter book name"
                            className={commonInputClass}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label>
                            <strong>Author</strong>
                        </label>
                        <input
                            type="text"
                            {...register("author")}
                            placeholder="Enter author name"
                            className={commonInputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>Left Books</strong>
                        </label>
                        <input
                            type="number"
                            {...register("leftCount")}
                            placeholder="Enter number of copies left"
                            className={commonInputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>Price</strong>
                        </label>
                        <input
                            type="number"
                            {...register("price")}
                            placeholder="Enter book price"
                            className={commonInputClass}
                            step="0.01" 
                            min="0" 
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>Publisher</strong>
                        </label>
                        <input
                            type="text"
                            {...register("publisher")}
                            placeholder="Enter publisher name"
                            className={commonInputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>Year</strong>
                        </label>
                        <input
                            type="number"
                            {...register("year")}
                            placeholder="Enter publication year"
                            className={commonInputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>ISBN</strong>
                        </label>
                        <input
                            type="text"
                            {...register("isbn")}
                            placeholder="Enter ISBN number"
                            className={commonInputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label>
                            <strong>Category</strong>
                        </label>
                        <select
                            {...register("category")}
                            className="focus:outline-none focus:border cursor-pointer focus:border-primary-color w-full bg-transparent py-2 px-4 border rounded outline-none"
                            required
                        >
                            <option selected disabled value="">
                                Select Category
                            </option>
                            <option value="Academic">Academic</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Fiction">Fiction</option>
                        </select>
                    </div>

                    <div className="form-control pt-1 w-full col-span-2">
                        <Button isDisabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Book"}
                        </Button>
                    </div>
                    </form>
                </>}
            </div>
        </div>
    );
};

export default UpdateBookModal;