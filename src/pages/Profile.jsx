import { useState } from "react";
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
    const [profile, setProfile] = useState(
        user || {
            id: "",
            name: "",
            email: "",
            company: "",
            role: ""
        }
    );

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

    function handleSaveProfile() {
        updateUser(profile);

        setEditing(false);

        setMessage("Profile updated successfully!");

        setTimeout(()=> {
            setMessage("");
        }, 3000);
    }

    function handleSavePassword() {
        setError("");
        
        if(
            !passwords.current ||
            !passwords.newPassword ||
            !passwords.confirm
        ) {
            setError(
                "All password fields are required."
            );
            return;
        }

        if(passwords.newPassword.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if(passwords.newPassword !== passwords.confirm) {
            setError("Passwords do not match.");
            return;
        }

        const result = changePassword(
            passwords.current,
            passwords.newPassword
        );

        if(!result.success){
            setError( result.message );
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
                    <div className="card shadow-sm border-0">
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
                                <div className="alert alert-danger">
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
                                        onClick={() => setEditing(true) }
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
                                            onClick={handleSaveProfile}
                                        > Save </button>

                                        <button
                                            className="btn btn-secondary flex-fill"
                                            onClick={() => {
                                                setEditing(false);
                                                setProfile(user);
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
                                                onClick={handleSavePassword}
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