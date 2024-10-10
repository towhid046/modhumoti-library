'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import swal from 'sweetalert';
import { toast } from 'react-toastify'

const useBookIds = () => {
    const [bookIds, setBookIds] = useState<string[]>([])
    const { data: session } = useSession();
    const router = useRouter();

    const handleAddToCartBook = async (i: string) => {
        // const ids: string[] = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];

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
            // localStorage.setItem('bookIds', JSON.stringify([...ids, i]));
            setBookIds([...bookIds, i])
            toast.success('Added success!')
        }
    };
    return {
        bookIds, setBookIds, handleAddToCartBook
    }
}

export default useBookIds;