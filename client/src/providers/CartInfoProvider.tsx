import { ReactNode, useState, createContext, useEffect, Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify";
export const BookIdContext = createContext<CartInfoProps | null>(null)

interface CartInfoProps {
    bookIds: string[],
    setBookIds: Dispatch<SetStateAction<string[]>>,
    handleAddToCartBook: (id: string, isBuyNow?: boolean) => void,
    isCartShow: boolean,
    setIsCartShow: Dispatch<SetStateAction<boolean>>,
}
const CartInfoProvider = ({ children }: { children: ReactNode }) => {
    const [bookIds, setBookIds] = useState<string[] | []>([])
    const [isCartShow, setIsCartShow] = useState<boolean>(false);

    useEffect(() => {
        const existedIds = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];
        setBookIds(existedIds)
    }, [])

    const handleAddToCartBook = async (id: string, isBuyNow: boolean = false) => {

        const existedIds = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];
        if (!existedIds.includes(id)) {
            localStorage.setItem('bookIds', JSON.stringify([...bookIds, id]));
            setBookIds([...bookIds, id])
            if (!isBuyNow) {
                toast.success('Itme added!', {
                    autoClose: 2000
                })
            }
        } else {
            toast.info('Already Existed!')
        }
    };

    return (
        <BookIdContext.Provider value={{
            bookIds,
            setBookIds,
            handleAddToCartBook,
            isCartShow,
            setIsCartShow
        }}>
            {children}
        </BookIdContext.Provider>
    )
}

export default CartInfoProvider;