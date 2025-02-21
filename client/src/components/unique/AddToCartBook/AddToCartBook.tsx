import { BsCartPlus } from "react-icons/bs";

import Button from './../../shared/Button/Button';
import useCart from "../../../hooks/useCart";
import { useEffect } from "react";

const AddToCartBook = ({ id }: { id: string }) => {
    const { handleAddToCartBook, bookIds, setIsCartShow } = useCart()
    useEffect(() => { }, [bookIds])

    return (
        <>
            {bookIds?.includes(id as never) ?
                <Button
                    clickHandler={() => setIsCartShow(true)}
                    customClass="bg-black sm:flex-1">
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
