import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/Layout/DashboardLayout";
import CardSkeleton from "../components/Loader/CardSkeleton";
import StatCard from "../components/Cards/StatCard";
import { fetchGraphQL } from "../graphql/client";
import { GET_DASHBOARD_STATS } from "../graphql/queries/dashboard";
import { FaUsers, FaFileAlt, FaComments, FaImages } from "react-icons/fa";

export default function Dashboard() {
    const [stats, setStats] = useState({
        users: 0,
        posts: 0,
        comments: 0,
        albums: 0,
    });

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
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
                setError(err.message || "Failed to load dashboard.");
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    return (
        <DashboardLayout>
            <div className="mb-4">
                <h2 className="fw-bold"> Welcome back, {user?.name || "User"}! </h2>
                <p className="text-muted mb-0">
                    Role: {user?.role}
                </p>
                <p className="text-muted">
                    Here's a quick overview.
                </p>
            </div>

            { loading && (
                <div className="row">
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                </div>
            )}
            { error && (
                <div className="alert alert-danger">
                    <strong>Erorr:</strong> {error}
                </div>
            )}

            {!loading && !error && (
                <div className="row">
                    <StatCard
                        title="Users"
                        value={stats.users}
                        icon={<FaUsers/>}
                    />
                    <StatCard
                        title="Posts"
                        value={stats.posts}
                        icon={<FaFileAlt/>}
                    />             
                    <StatCard
                        title="Comments"
                        value={stats.comments}
                        icon={<FaComments/>}
                    />
                    <StatCard
                        title="Albums"
                        value={stats.albums}
                        icon={<FaImages/>}
                    />       
                </div>
            )}
        </DashboardLayout>
    );
}