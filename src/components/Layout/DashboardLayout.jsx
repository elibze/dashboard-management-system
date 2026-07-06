import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
