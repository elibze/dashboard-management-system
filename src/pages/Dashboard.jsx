import DashboardLayout from "../components/Layout/DashboardLayout";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <h2>Dashboard</h2>

            <div className="row g-3 mt-3">
                <div className="col-md-3">
                    <div className="card p-3">Users: 100</div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3"> Posts: 1000 </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3"> Comments: 500 </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3"> Albums: 200 </div>
                </div>
            </div>
        </DashboardLayout>
    );
}