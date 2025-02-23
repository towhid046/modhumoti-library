'use client'
import Button from "@/components/shared/Button/Button";
import { BsCartPlus } from "react-icons/bs";
import { useContext, useEffect } from 'react'
import { BookIdContext } from "@/providers/BookInfoProvider";
const AddToCartBook = ({ id }: { id: string }) => {
    const { bookIds, handleAddToCartBook, setIsCartShow } = useContext(BookIdContext)
    useEffect(() => { }, [bookIds])

    return (
        <>
            {bookIds?.includes(id as never) ?
                <Button clickHandler={() => setIsCartShow(true)} customClass="bg-black sm:flex-1">
                    View Cart
                </Button>
                :
                <Button
                    clickHandler={() => handleAddToCartBook(id)}
                    customClass="sm:flex-1 justify-center flex items-center gap-4 w-full"
                >
                    Add to cart
                    <BsCartPlus />
                </Button>
            }
        </>
    );
};

export default AddToCartBook;
