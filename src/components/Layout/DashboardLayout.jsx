import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default function DashboardLayout({ children }) {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar />
            <div className="flex-grow-1 bg-light">
                <Header />
                <main className="container-fluid p-4">{children}</main>
            </div>
        </div>
    );
}
