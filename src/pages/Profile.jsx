import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/Layout/DashboardLayout";

export default function Profile() {
    const {
        user,
        updateUser
    } = useAuth();

    const [message, setMessage] = useState("");
    const [profile, setProfile] = useState(() => {
            return user || {
            name: "",
            email: "",
            role: ""
            };
    });

    if (!user) {
        return (
            <DashboardLayout>
                <div className="alert alert-warning">
                    No user information available.
                </div>
            </DashboardLayout>
        );
    }

    function handleChange(e) {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }

    function handleSave() {
        updateUser(profile);

        setMessage("Profile updated successfully!");

        setTimeout(()=> {
            setMessage("");
        }, 3000);
    }

    return (
        <DashboardLayout>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">
                                My Profile
                            </h2>

                            {message && (
                                <div className="alert alert-success">
                                {message}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    className="form-control"
                                    name="name"
                                    value={profile?.name}
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
                                    value={profile?.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Role
                                </label>

                                <input
                                    className="form-control"
                                    name="role"
                                    value={profile?.role}
                                    onChange={handleChange}
                                />
                            </div>

                            <buttton
                                className="btn btn-primary w-100"
                                onClick={handleSave}
                            >Save Profile</buttton>

                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}