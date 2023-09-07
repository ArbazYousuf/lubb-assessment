import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const auth = getAuth();  // Assuming you've initialized your Firebase app elsewhere

    useEffect(() => {
        // Check if user is authenticated with Firebase
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {  // User is signed in
                navigate("/");
            } else {  // No user is signed in
                const queryParams = new URLSearchParams(window.location.search);
                const token = queryParams.get('token');
                if (token) {
                    localStorage.setItem('token', token);
                    // Here you can dispatch a Redux action or other side effects
                    navigate("/");
                } else {
                    navigate("/signin");
                }
            }
        });

        // Clean up the onAuthStateChanged listener when the component is unmounted
        return () => unsubscribe();
    }, [auth, navigate]);

    return <>{children}</>;
}

export default ProtectedRoute;