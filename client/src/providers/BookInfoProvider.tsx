'use client';
import { ReactNode, useState, createContext, useEffect, Dispatch, SetStateAction } from "react"
import swal from 'sweetalert'
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const BookIdContext = createContext<string[] | [] | any>([])

interface BookInfoProps {
    bookIds: string[],
    setBookIds: Dispatch<SetStateAction<string[]>>,
    handleAddToCartBook: (id: string) => void,
    isCartShow: boolean,
    setIsCartShow: Dispatch<SetStateAction<boolean>>,
}
const BookInfoProvider = ({ children }: { children: ReactNode }) => {
    const [bookIds, setBookIds] = useState<string[] | []>([])
    const [isCartShow, setIsCartShow] = useState<boolean>(false);

    useEffect(() => {
        const existedIds = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];
        setBookIds(existedIds)
    }, [])

    // const { data: session } = useSession();
    // const router = useRouter();

    const handleAddToCartBook = async (id: string, isBuyNow: boolean = false) => {

        // if (!session?.user) {
        //     const notLoggedInUser = await swal({
        //         title: "Login Required",
        //         text: "To add items to the cart, you need to log in first.",
        //         icon: "info",
        //         buttons: ['Cancel', 'Login']
        //     });

        //     if (notLoggedInUser) {
        //         router.push('/login');
        //         return;
        //     }
        // }
        // else {
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
        // }
    };


    const bookInfo: BookInfoProps = {
        bookIds,
        setBookIds,
        handleAddToCartBook,
        isCartShow,
        setIsCartShow,
    }
    return (
        <BookIdContext.Provider value={bookInfo}>
            {children}
        </BookIdContext.Provider>
    )
}

export default BookInfoProvider