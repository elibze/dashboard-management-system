import { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(()=> {
        const savedUser = localStorage.getItem("profile");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    function login(email, password) {
        if (
            email === "admin@test.com" &&
            password === "admin123"
        ) {
            const loggedInUser = {
                name: "Admin",
                email: "admin@test.com",
                role: "Administrator",
            };

            localStorage.setItem(
                "token",
                "loggedIn"
            );

            localStorage.setItem(
                "profile",
                JSON.stringify(loggedInUser)
            );

            setUser(loggedInUser);
            setIsAuthenticated(true);

            return {
                success: true,
                user: loggedInUser,
            };
        }

        return {
            success: false,
            message: "Invalid email or password.",
        };
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        setUser(null);
        setIsAuthenticated(false);
    }

    function updateUser(updatedUser) {
        localStorage.setItem(
            "profile",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}