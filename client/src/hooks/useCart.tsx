import { useContext } from "react";
import { BookIdContext } from "../providers/CartInfoProvider";

// Custom Hook for Accessing Auth Context
const useCart = () => {
    const context = useContext(BookIdContext);
    if (!context) throw new Error("useCart must be used within an AuthProvider");
    return context;
};

export default useCart;