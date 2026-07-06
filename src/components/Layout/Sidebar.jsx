import { Link } from "react-router-dom";
export default function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3"
            style={{ width: "220px", minHeight: "100vh" }}
        >
            <h4 className="mb-4"> Dashboard </h4>

            <ul className="nav flex-column gap-2">
                <li>
                    <Link className="text-white text-decoration-none" to="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link className="text-white text-decoration-none" to="/users">
                        Users
                    </Link>
                </li>

                <li>
                    <Link className="text-white text-decoration-none" to="/profile">
                        Profile
                    </Link>
                </li>

                <li>
                    <Link className="text-danger text-decoration-none" to="/">
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}