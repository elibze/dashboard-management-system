import { useState } from "react";
import { AuthContext } from "./auth.context";

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const login = (email, password) => {
        if (email === "admin@test.com" && password === "admin123") {
            localStorage.setItem("token", "loggedIn");
            setIsAuthenticated(true);
            return { success: true };
        }
        return {
            success: false,
            message: "Invalid email or password",
        };
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}