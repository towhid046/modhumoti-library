import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

// Custom Hook for Accessing Auth Context
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default useAuth;