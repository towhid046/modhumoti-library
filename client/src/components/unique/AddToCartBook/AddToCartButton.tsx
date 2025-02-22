import { useEffect } from 'react';
import useCart from '../../../hooks/useCart';
import Button from '../../shared/Button/Button';

const AddToCartButton = ({ id }: { id: string }) => {
    const { bookIds, addToCartHandler, setIsCartShow } = useCart()
    useEffect(() => { }, [bookIds])

    const handleBuyNow = () => {
        addToCartHandler(id)
        setIsCartShow(true)
    }
    return (
        <div className='w-full'>
            {bookIds?.map(item => item.id).includes(id as never) ?
                <Button
                    clickHandler={() => setIsCartShow(true)}
                    customClass="sm:flex-1 !w-full">
                    View Cart
                </Button>
                :
                <Button
                    clickHandler={handleBuyNow}
                    customClass='sm:flex-1 !w-full'>Add to Cart</Button>
            }
        </div>
    );
};

export default AddToCartButton;
