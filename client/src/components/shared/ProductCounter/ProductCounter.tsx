import { useLocation } from "react-router-dom"
import useCart from "../../../hooks/useCart"
import { Book } from "../../../lib/commonTypes"

interface ProductCounterProps {
    book: Book
}

const ProductCounter: React.FC<ProductCounterProps> = ({ book }) => {
    const path = useLocation().pathname?.split('/')

    const { _id, leftCount } = book;
    const { bookIds, decrementCount, incrementCount } = useCart();

    const itemCount = bookIds.find(item => item.id === _id);

    return (
        <div className="flex items-center border border-gray-300 rounded-md justify-between">
            <button
                className={`w-9 ${path.includes('cart') ? 'h-8' : 'h-10'} flex items-center justify-center rounded-l-md disabled:cursor-not-allowed border-r border-gray-300 hover:bg-gray-100 transition-colors duration-200`}
                onClick={() => decrementCount(_id)}
                disabled={!itemCount || itemCount?.count === 1}
            >
                -
            </button>
            <div className={`${path.includes('cart') ? 'mx-2 text-md' : 'mx-4 text-lg font-semibold'}`}>{itemCount?.count || 1}</div>
            <button
                className={`w-9 ${path.includes('cart') ? 'h-8' : 'h-10'} flex items-center justify-center rounded-r-md disabled:cursor-not-allowed border-l border-gray-300 hover:bg-gray-100 transition-colors duration-200`}
                onClick={() => incrementCount(_id)}
                disabled={itemCount?.count === leftCount}
            >
                +
            </button>
        </div>
    )
}

export default ProductCounter;
