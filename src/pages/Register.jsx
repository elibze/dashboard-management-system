import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");
        
        if (
            !form.name.trim() ||
            !form.company.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.confirmPassword.trim()
        ) {
            setError("All fields are required.");
            return;
        }

        if (!form.email.includes("@")) {
            setError("Please enter a valid email.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = register({
            name: form.name,
            company: form.company,
            email: form.email,
            password: form.password,
        });

        if (!result.success) {
            setError(result.message);
            return;
        }

        setSuccess("Account created successfully!");

        setTimeout(() => {
            navigate("/");
        }, 1200);
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4 register-card">
                <h2 className="text-center mb-4">
                    Create Account
                </h2>

                {error && (
                    <div className="alert alert-danger">
                        <strong>Error:</strong>{error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Full Name
                        </label>
                        <input
                            className="form-control"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Company
                        </label>
                        <input
                            className="form-control"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Confirm Password
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button
                        className="btn btn-success w-100"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}