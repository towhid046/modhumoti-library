'use client'
import Button from "@/components/shared/Button/Button";
import useBookIds from "@/hooks/useBookIds";
import { BsCartPlus } from "react-icons/bs";

const AddToCartBook = ({ id }: { id: string }) => {

    const { bookIds, handleAddToCartBook } = useBookIds()
    return (
        <>
            {bookIds?.includes(id as never) ?
                <Button customClass="bg-black sm:flex-1">
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
