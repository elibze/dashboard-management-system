import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }
        if (!email.includes("@")) {
            setError("Invalid email format.");
            return;
        }
        if(password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        const result = login(email,password);

        if (!result.success) {
            setError(result.message);
            return;
        }
        navigate("/dashboard");
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow-lg login-card">
                <h2 className ="text-center mb-4">Login</h2>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                        > Email </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="form-label"
                        > Password </label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-4 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none">Register</Link>
                </p>
            </div>
        </div>
    );
}