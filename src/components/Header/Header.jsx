import { FaBell } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
    const { logout } = useAuth();
    const today = new Date().toLocaleDateString("en-GB", {
        weekday: "long", 
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="bg-white border-bottom shadow-sm px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0 fw-bold">Admin Dashboard</h4>
                    <small className="text-muted">
                        {today}
                    </small>
                </div>
                <div className="d-flex align-items-center gap-4">
                    <div className="position-relative">
                        <FaBell size={22} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            3
                        </span>
                    </div>
                    <div className="text-end">
                        <div className="fw-semibold">Admin</div>
                            <small className="text-muted"> admin@test.com </small>
                        </div>
                        <button
                            className="btn btn-outline-danger"
                            onClick={logout}
                        > Logout </button>
                    </div>
                </div>
        </header>
    );
}