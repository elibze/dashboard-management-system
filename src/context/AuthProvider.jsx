import { useState } from "react";
import { AuthContext } from "./auth.context";

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const login = () => {
        localStorage.setItem("token", "loggedIn");
        setIsAuthenticated(true);
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