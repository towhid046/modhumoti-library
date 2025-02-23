import { createContext, useEffect, useState, ReactNode } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, UserCredential } from "firebase/auth";
import { auth, googleProvider } from "./../config/firebase.config"; // Ensure you have Firebase configured

// Create Auth Context
export const AuthContext = createContext<AuthContextType | null>(null);

// Firebase Auth Instance

// Define TypeScript Interface for Context
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    updateUser: (displayName: string) => Promise<void>;
}

// Auth Provider Component
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign Up Function
    const signUp = async (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // Login Function
    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    // Login with google Function
    const loginWithGoogle = async () => {
        return signInWithPopup(auth, googleProvider);
    };
    // Update user Function
    const updateUser = async (displayName: string) => {
        if (!auth.currentUser) {
            throw new Error("No user is signed in.");
        }

        try {
            await updateProfile(auth.currentUser, { displayName });
            setUser({ ...auth.currentUser }); // Update local state
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    };

    // Logout Function
    const logout = async () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signUp, updateUser, loginWithGoogle }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;
