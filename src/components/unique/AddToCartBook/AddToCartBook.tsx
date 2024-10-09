'use client'
import Button from "@/components/shared/Button/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import swal from "sweetalert";
import { toast } from 'react-toastify'

const AddToCartBook = ({ id }: { id: string }) => {
    const [booksId, setBooksId] = useState<string[] | []>(localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : []);
    const { data: session } = useSession();
    const router = useRouter();

    const handleAddToCartBook = async (i: string) => {
        const ids: string[] = localStorage.getItem('bookIds') ? JSON.parse(localStorage.getItem('bookIds') as string) : [];

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

        if (ids.includes(i)) {
            swal('Already Added', 'This book is already in your cart.', 'warning');
        } else {
            localStorage.setItem('bookIds', JSON.stringify([...ids, i]));
            toast.success('Added success!')
        }
    };

    return (
        <>
            {booksId?.includes(id as never) ?
                <Button customClass="bg-black">
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
