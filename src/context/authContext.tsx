import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from "../utils/firebaseConfig";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    handleGoogleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const auth = getAuth(app);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
                // Handle the error here, for example, display a message to the user
                alert("auth/user-not-found")
                console.error("No user found with this email address.");
            } else {
                // Handle other errors
                console.error(error.message);
            }
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                // Handle the error here, for example, display a message to the user
                alert("auth/email-already-in-use")
                console.error("No user found with this email address.");
            } else {
                // Handle other errors
                console.error(error.message);
            }
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const handleGoogleLogin = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Logged in user:", user);
        } catch (error) {
            console.error("Error logging in with Google:", error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, signup, logout, handleGoogleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
