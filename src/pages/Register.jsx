import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if(!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
            setError("All fields are required!");
            return;
        }
        if (!form.email.includes("@")) {
            setError("Invalid email!");
            return;
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters!");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        alert ("Registration successful!");
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center align-items-center"
        style= {{ height: "100vh" }}>
            <div className="card p-4 shadow register-card">
                <h3 className="text-center mb-3">Create Account</h3>

                {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label"> Full Name </label>
                        <input
                            name="name"
                            placeholder="Name"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"> Email </label>
                        <input
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"> Password </label>
                        <input 
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label"> Confirm Password </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        Register
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link to="/" className="text-decoration-none">Login</Link>
                </p>
            </div>
        </div>
    );
}