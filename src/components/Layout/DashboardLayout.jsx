import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useState } from "react";

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
        <div
            className={
                sidebarOpen
                ? "overlay show"
                : "overlay"
            }
            onClick={()=>setSidebarOpen(false)}
        ></div>

        <div className="dashboard-wrapper d-flex min-vh-100">
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
            />
            <div className="flex-grow-1">
                <Header
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className="container-fluid p-3 p-md-4">{children}</main>
            </div>
        </div>
        </>
    );
}
