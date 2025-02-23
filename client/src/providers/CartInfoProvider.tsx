import { ReactNode, useState, createContext, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const BookIdContext = createContext<CartInfoProps | null>(null);

interface CartItem {
    id: string;
    count: number;
}

interface CartInfoProps {
    bookIds: CartItem[]; // Array of CartItem objects
    setBookIds: Dispatch<SetStateAction<CartItem[]>>;
    addToCartHandler: (id: string) => void;
    removeFromCartHandler: (id: string) => void;
    incrementCount: (id: string) => void;
    decrementCount: (id: string) => void;
    isCartShow: boolean;
    setIsCartShow: Dispatch<SetStateAction<boolean>>;
}

const CartInfoProvider = ({ children }: { children: ReactNode }) => {
    const [bookIds, setBookIds] = useState<CartItem[]>([]);
    const [isCartShow, setIsCartShow] = useState<boolean>(false);

    // Load cart items from localStorage on initial render
    useEffect(() => {
        const existingItems = localStorage.getItem('bookIds')
            ? JSON.parse(localStorage.getItem('bookIds') as string)
            : [];
        setBookIds(existingItems);
    }, []);

    // Add an item to the cart
    const addToCartHandler = (id: string) => {
        const existingItems = localStorage.getItem('bookIds')
            ? JSON.parse(localStorage.getItem('bookIds') as string)
            : [];

        const existingItem = existingItems.find((item: CartItem) => item.id === id);

        if (existingItem) {
            // If the item already exists, increment its count
            incrementCount(id);
        } else {
            // If the item doesn't exist, add it with count = 1
            const updatedItems = [...existingItems, { id, count: 1 }];
            localStorage.setItem('bookIds', JSON.stringify(updatedItems));
            setBookIds(updatedItems);
            toast.success('Item added to cart!', {
                autoClose: 2000,
                position: 'top-left',
            });
        }
    };

    // Remove an item from the cart
    const removeFromCartHandler = (id: string) => {
        const existingItems = localStorage.getItem('bookIds')
            ? JSON.parse(localStorage.getItem('bookIds') as string)
            : [];

        const updatedItems = existingItems.filter((item: CartItem) => item.id !== id);
        localStorage.setItem('bookIds', JSON.stringify(updatedItems));
        setBookIds(updatedItems);
        toast.info('Item removed from cart!', {
            autoClose: 2000,
            position: 'top-left',
        });
    };

    // Increment the count of an item in the cart
    const incrementCount = (id: string) => {
        const existingItems = localStorage.getItem('bookIds')
            ? JSON.parse(localStorage.getItem('bookIds') as string)
            : [];

        const existingItem = existingItems.find((item: CartItem) => item.id === id);

        if (existingItem) {
            // Increment the count
            const updatedItems = existingItems.map((item: CartItem) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            );
            localStorage.setItem('bookIds', JSON.stringify(updatedItems));
            setBookIds(updatedItems);
            toast.info('Item count increased!', {
                autoClose: 2000,
                position: 'top-left',
            });
        } else {
            // If the item doesn't exist, add it with count = 1
            addToCartHandler(id);
        }
    };

    // Decrement the count of an item in the cart
    const decrementCount = (id: string) => {
        const existingItems = localStorage.getItem('bookIds')
            ? JSON.parse(localStorage.getItem('bookIds') as string)
            : [];

        const existingItem = existingItems.find((item: CartItem) => item.id === id);

        if (existingItem) {
            if (existingItem.count > 1) {
                // Decrement the count
                const updatedItems = existingItems.map((item: CartItem) =>
                    item.id === id ? { ...item, count: item.count - 1 } : item
                );
                localStorage.setItem('bookIds', JSON.stringify(updatedItems));
                setBookIds(updatedItems);
                toast.info('Item count decreased!', {
                    autoClose: 2000,
                    position: 'top-left',
                });
            } else {
                // If count is 1, remove the item entirely
                // removeFromCartHandler(id);
            }
        } else {
            toast.info('Item not found in cart!', {
                autoClose: 2000,
                position: 'top-left',
            });
        }
    };

    return (
        <BookIdContext.Provider
            value={{
                bookIds,
                setBookIds,
                addToCartHandler,
                removeFromCartHandler,
                isCartShow,
                setIsCartShow,
                incrementCount,
                decrementCount
            }}
        >
            {children}
        </BookIdContext.Provider>
    );
};

export default CartInfoProvider;