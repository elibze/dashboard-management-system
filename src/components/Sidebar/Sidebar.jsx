import { Link, useLocation } from "react-router-dom";
import { 
    FaHome,
    FaUsers,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();
    const active = (path) =>
        location.pathname === path
            ? "nav-link text-white bg-primary rounded"
            : "nav-link text-white";

    return (
        <div
            className="bg-dark text-white p-3 d-flex flex-column"
            style={{ width: "240px", minHeight: "100vh"
            }}
        > 
            <h3 className="mb-4 text-center">
                Admin
            </h3>
            
            <ul className="nav flex-column gap-2">
                <li className="nav-item">
                    <Link
                        className={active("/dashboard")}
                        to="/dashboard"
                    > <FaHome className="me-2"/> Dashboard </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={active("/users")}
                        to="/users"
                    > <FaUsers className="me-2"/> Users </Link>
                </li>
                <li>
                    <Link
                        className={active("/profile")}
                        to="/profile"
                    > <FaUserCircle className="me-2"/> Profile </Link>
                </li>
            </ul>

            <div className="mt-auto">
                <button
                    className="btn btn-outline-light w-100"
                    onClick={logout}
                > <FaSignOutAlt className="me-2"/> Logout </button>
            </div>
        </div>
    );
}