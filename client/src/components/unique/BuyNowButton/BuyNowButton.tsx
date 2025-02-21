import { useEffect } from 'react';
import useCart from '../../../hooks/useCart';
import Button from './../../shared/Button/Button';

const BuyNowButton = ({ id }: { id: string }) => {
    const { bookIds, handleAddToCartBook, setIsCartShow } = useCart()
    useEffect(() => { }, [bookIds])

    const handleBuyNow = () => {
        handleAddToCartBook(id, true)
        setIsCartShow(true)
    }
    return (
        <>
            {bookIds?.includes(id as never) ?
                <Button
                    clickHandler={() => setIsCartShow(true)}
                    customClass="!bg-black sm:flex-1">
                    Buy Now
                </Button>
                :
                <Button
                    clickHandler={handleBuyNow}
                    customClass='!bg-black sm:flex-1 w-full'>Buy Now</Button>
            }
        </>
    );
};

export default BuyNowButton;
