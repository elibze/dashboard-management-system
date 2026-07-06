import { useAuth } from "../../hooks/useAuth";

export default function Header() {
    const { logout } = useAuth();

    return (
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h5 className="m-0"> Admin Panel </h5>

            <div>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}