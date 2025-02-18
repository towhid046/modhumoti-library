import Button from "@/components/shared/Button/Button";
import { useContext, useEffect } from 'react'
// import { BookIdContext } from "@/providers/BookInfoProvider";
const BuyNowButton = ({ id }: { id: string }) => {
    // const { bookIds, handleAddToCartBook, setIsCartShow } = useContext(BookIdContext)

    // useEffect(() => { }, [bookIds])
    // const handleBuyNow = () => {
    //     handleAddToCartBook(id, true)
    //     setIsCartShow(true)
    // }
    return (
        <>
            {[234.23, 234234]?.includes(id as never) ?
                <Button
                    // clickHandler={() => setIsCartShow(true)} 
                    customClass="!bg-black sm:flex-1">
                    Buy Now
                </Button>
                :
                <Button
                    // clickHandler={handleBuyNow}
                    customClass='!bg-black sm:flex-1 w-full'>Buy Now</Button>
            }
        </>
    );
};

export default BuyNowButton;
