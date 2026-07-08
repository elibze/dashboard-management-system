import { Link, useLocation } from "react-router-dom";
import { 
    FaHome,
    FaUsers,
    FaUserCircle,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar({
    sidebarOpen,
    closeSidebar
}) {
    const location = useLocation();
    const { logout } = useAuth();
    const active = (path) =>
        location.pathname === path
            ? "nav-link text-white bg-primary rounded"
            : "nav-link text-white";

    return (
        <aside
            className={`
                sidebar
                ${sidebarOpen ? "show" : ""}
            `}
        > 
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="m-0">
                    Admin
                </h3>

                <button
                    className="btn btn-outline-light d-md-none"
                    onClick={closeSidebar}
                    aria-label="Close menu"
                >
                    <FaTimes/>
                </button>
            </div>
            
                <ul className="nav flex-column gap-2">
                    <li className="nav-item">
                        <Link
                            onClick={closeSidebar}
                            className={active("/dashboard")}
                            to="/dashboard"
                        > <FaHome className="me-2"/> Dashboard </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            onClick={closeSidebar}
                            className={active("/users")}
                            to="/users"
                        > <FaUsers className="me-2"/> Users </Link>
                    </li>
                    <li>
                        <Link
                            onClick={closeSidebar}
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
        </aside>
    );
}