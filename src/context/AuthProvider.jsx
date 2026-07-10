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

    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function register(newUser) {
        const users = getUsers();

        const exists = users.find(
            (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
        );

        if (exists) {
            return {
                success: false,
                message: "Email already exists",
            };
        }

        const userToSave = {
            id: Date.now(),
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            company: newUser.company || "My Company",
            role: "User"
        };

        users.push(userToSave);
        saveUsers(users);

        return {
            success: true
        };
    }

    function login(email, password) {
        if (
            email === "admin@test.com" &&
            password === "admin123"
        ) {
            const admin = {
                id: 0,
                name: "Administrator",
                email: "admin@test.com",
                company: "Dashboard Inc.",
                role: "Administrator"
            };

            localStorage.setItem("token", "loggedIn");
            localStorage.setItem(
                "currentUser",
                JSON.stringify(admin)
            );
            
            setUser(admin);
            setIsAuthenticated(true);

            return {
                success:true
            };
        }

        const users = getUsers();
        const found = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password
        );

        if (!found) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        const loggedUser = {
            ...found
        };

        delete loggedUser.password;

        localStorage.setItem("token", "loggedIn");
        localStorage.setItem(
            "currentUser",
            JSON.stringify(loggedUser)
        );

        setUser(loggedUser);
        setIsAuthenticated(true);

        return {
            success:true
        };
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        setUser(null);
        setIsAuthenticated(false);
    }

    function updateUser(updatedUser) {
        const users = getUsers();

        const updatedUsers = users.map((u) =>
            u.id === updatedUser.id
                ? {
                    ...u,
                    ...updatedUser,
                    password: u.password
                }
            : u
        );

        saveUsers(updatedUsers);
        localStorage.setItem(
            "currentUser",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
    }

    function changePassword(currentPassword, newPassword) {
        const users = JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const index = users.findIndex(
            item => item.email === user.email
        );

        if (index === -1) {
            return {
                success: false,
                message: "User not found"
            };
        }

        if(users[index].password !== currentPassword) {
            return {
                success:false,
                message:"Current password incorrect"
            };
        }

        users[index].password = newPassword;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        return {
            success:true
        };
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                register,
                updateUser,
                changePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}