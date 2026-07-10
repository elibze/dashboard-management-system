import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/Layout/DashboardLayout";

export default function Profile() {
    const {
        user,
        updateUser,
        changePassword
    } = useAuth();

    const [editing, setEditing] = useState(false);
    const [passwordEditing, setPasswordEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef(null);
    const [profile, setProfile] = useState({
        id:"",
        name:"",
        email:"",
        company:"",
        role:"",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        newPassword: "",
        confirm:""
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

    function showError(message) {
        setError(message);
        
        setTimeout(() => {
            errorRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }

    function startEditing() {
        setProfile({
            id:user.id,
            name:user.name,
            email:user.email,
            company:user.company,
            role:user.role
        });
        setEditing(true);
    }

    function handleChange(e) {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }

    function handlePasswordChange(e){
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    }

    function saveProfile() {
        updateUser(profile);

        setEditing(false);

        setMessage("Profile updated successfully!");

        setTimeout(()=> {
            setMessage("");
        }, 3000);
    }

    function savePassword() {
        showError("");
        setMessage("");
        
        if(
            passwords.current.trim() === "" ||
            passwords.newPassword.trim() === "" ||
            passwords.confirm.trim() === ""
        ) {
            showError(
                "All password fields are required."
            );
            return;
        }

        if(passwords.newPassword.length < 6) {
            showError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if(passwords.newPassword !== passwords.confirm) {
            showError("Passwords do not match.");
            return;
        }

        const result = changePassword(
            passwords.current,
            passwords.newPassword
        );

        if(!result.success){
            showError( result.message );
            return;
        }

        setPasswordEditing(false);

        setPasswords({
            current:"",
            newPassword:"",
            confirm:"",
        });

        setMessage( "Password changed successfully!");

        setTimeout(()=> {
            setMessage("");
        }, 3000);
    }

    return (
        <DashboardLayout>
            <div className="row justify-content-center">
                <div className="col-lg-7">
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

                            {error && (
                                <div
                                    ref={errorRef}
                                    className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {!editing ? (
                                <>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th> ID </th>
                                                <td> {user.id || "N/A"} </td>
                                            </tr>

                                            <tr>
                                                <th> Name </th>
                                                <td> {user.name} </td>
                                            </tr>

                                            <tr>
                                                <th> Email </th>
                                                <td> {user.email} </td>
                                            </tr>

                                            <tr>
                                                <th> Company </th>
                                                <td> {user.company || "N/A"} </td>
                                            </tr>

                                            <tr>
                                                <th> Role </th>
                                                <td> {user.role} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <button
                                        className="btn btn-primary w-100 mt-3"
                                        onClick={startEditing}
                                    > Edit Profile </button>
                                </>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Name
                                        </label>

                                        <input
                                            className="form-control"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            className="form-control"
                                            name="email"
                                            value={profile.email}
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
                                            value={profile.company}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Role
                                        </label>

                                        <input
                                            className="form-control"
                                            value={profile.role}
                                            disabled
                                        />

                                        <small className="text-muted">
                                            Role cannot be changed.
                                        </small>

                                    </div>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-success flex-fill"
                                            onClick={saveProfile}
                                        > Save </button>

                                        <button
                                            className="btn btn-secondary flex-fill"
                                            onClick={() => {
                                                setEditing(false);
                                                setProfile({
                                                    id:user.id,
                                                    name:user.name,
                                                    email:user.email,
                                                    company:user.company,
                                                    role:user.role
                                                });
                                                setError("");
                                                setMessage("");
                                            }}
                                        > Cancel </button>
                                    </div>
                                </>
                            )}

                            <hr className="my-4"/>

                            <h5> Account Security </h5>

                            {
                                !passwordEditing ? (
                                    <button
                                        className="btn btn-outline-dark w-100"
                                        onClick={()=>setPasswordEditing(true)}
                                    > Change Password </button>

                                ) : (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Current Password
                                            </label>

                                            <input
                                                type="password"
                                                className="form-control"
                                                name="current"
                                                value={passwords.current}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                New Password
                                            </label>
                                            
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="newPassword"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Confirm New Password
                                            </label>

                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirm"
                                                value={passwords.confirm}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-success flex-fill"
                                                onClick={savePassword}
                                            > Save Password </button>

                                            <button
                                                className="btn btn-secondary flex-fill"
                                                onClick={()=> {
                                                    setPasswordEditing(false);
                                                    setPasswords({
                                                        current:"",
                                                        newPassword:"",
                                                        confirm:""
                                                    });
                                                    setError("");
                                                    setMessage("");
                                                }}
                                            > Cancel </button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}