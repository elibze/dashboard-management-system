import { FaBell, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ toggleSidebar }) {

    const { logout, user } = useAuth();

    const today = new Date().toLocaleDateString("en-GB", {
        weekday: "long", 
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <header className="bg-white border-bottom shadow-sm px-3 py-3">

            <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center">

                    <button
                        className="btn btn-dark d-md-none me-3"
                        onClick={toggleSidebar}
                        aria-label="Open menu"
                    ><FaBars/></button>

                    <div>
                        <h5 className="mb-0 fw-bold">Dashboard</h5>
                        <small className="text-muted d-none d-md-block">
                            {today}
                        </small>

                    </div>

                </div>

                <div className="d-flex align-items-center gap-3">

                    <div className="position-relative">

                        <FaBell size={20} />
                        
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3
                            </span>

                    </div>

                    <div className="text-end">

                        <div className="fw-semibold">
                            {user?.name}
                        </div>

                        <small className="text-muted d-none d-lg-block">
                            {user?.email}
                        </small>
                    
                    </div>

                    <button
                        className="btn btn-outline-danger"
                        onClick={logout}        
                    > 
                        <FaSignOutAlt />
                        <span className="ms-2 d-nine d-md-inline">
                            Logout
                        </span>

                    </button>

                </div>

            </div>

        </header>
    );
}