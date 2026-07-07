import { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Loader from "../components/Loader/Loader";
import { fetchGraphQL } from "../graphql/client";
import { GET_DASHBOARD_STATS } from "../graphql/queries/dashboard";

function Card({ title, value }) {
    return (
        <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    <h6>{title}</h6>
                    <h2>{value}</h2>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        posts: 0,
        comments: 0,
        albums: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true);

                const data = await fetchGraphQL(GET_DASHBOARD_STATS);

                setStats({
                    users: data.users.data.length,
                    posts: data.posts.data.length,
                    comments: data.comments.data.length,
                    albums: data.albums.data.length,
                });

                setError("");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    return (
        <DashboardLayout>
            <h2 className="mb-4">Dashboard</h2>
            {loading && <Loader />}
            {error && <div className="alert alert-danger mt-3">
                        <strong>Error:</strong>{error} </div>}

            {!loading && !error && (
                <div className="row">
                    <Card title="Users" value={stats.users} />
                    <Card title="Posts" value={stats.posts} />
                    <Card title="Comments" value={stats.comments} />
                    <Card title="Albums" value={stats.albums} />
                </div>
            )}
        </DashboardLayout>
    );
}