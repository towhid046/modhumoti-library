'use client';
import { ReactNode, useState, createContext, useEffect } from "react"
import swal from 'sweetalert'
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export const BookIdContext = createContext<string[] | [] | any>([])


const BookInfoProvider = ({ children }: {
    children: ReactNode;
}) => {
    const [bookIds, setBookIds] = useState<string[] | []>([])
    useEffect(() => {
        const existedIds = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];
        setBookIds(existedIds)
    }, [])

    const { data: session } = useSession();
    const router = useRouter();

    const handleAddToCartBook = async (id: string) => {

        if (!session?.user) {
            const notLoggedInUser = await swal({
                title: "Login Required",
                text: "To add items to the cart, you need to log in first.",
                icon: "info",
                buttons: ['Cancel', 'Login']
            });

            if (notLoggedInUser) {
                router.push('/login');
                return;
            }
        }
        else {
            const existedIds = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];
            if (!existedIds.includes(id)) {
                localStorage.setItem('bookIds', JSON.stringify([...bookIds, id]));
                setBookIds([...bookIds, id])
                toast.success('Added success!')
            } else {
                toast.info('Already Existed!')
            }
        }
    };

    const bookInfo = {
        bookIds,
        setBookIds,
        handleAddToCartBook,
    }
    return (
        <BookIdContext.Provider value={bookInfo}>
            {children}
        </BookIdContext.Provider>
    )
}

export default BookInfoProvider