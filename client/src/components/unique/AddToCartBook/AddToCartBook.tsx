import { BsCartPlus } from "react-icons/bs";
// import { BookIdContext } from "@/providers/BookInfoProvider";
import Button from './../../shared/Button/Button';

const AddToCartBook = ({ id }: { id: string }) => {
    // const { bookIds, handleAddToCartBook, setIsCartShow } = useContext(BookIdContext)
    // useEffect(() => { }, [bookIds])

    return (
        <>
            {[234.23, 234]?.includes(id as never) ?
                <Button
                    // clickHandler={() => setIsCartShow(true)} 
                    customClass="bg-black sm:flex-1">
                    View Cart
                </Button>
                :
                <Button
                    // clickHandler={() => handleAddToCartBook(id)}
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
