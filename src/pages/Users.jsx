import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../components/Layout/DashboardLayout";
import Loader from "../components/Loader/Loader";
import { fetchGraphQL } from "../graphql/client";

const GET_USERS = `
    query GetUsers {
        users {
            data {
                id
                name
                username
                email
                website
            }
        }
    }
`;

export default function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadUsers () {
            try {
                setLoading(true);
                const data = await fetchGraphQL(GET_USERS);
                setUsers(data.users.data);
                setError("");
            } catch (err) {
                setError(err.message || "Failed to load users.");
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    const filtered = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    const users_per_page = 10;
    const totalPages = Math.ceil(filtered.length / users_per_page);

    const sortedUsers = [...filtered].sort((a,b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }
        if (sortBy === "username") {
            return a.username.localeCompare(b.username);
        }

        return 0;
    });

        const currentUsers = sortedUsers.slice(
        (page-1)*users_per_page,
        page*users_per_page
        );

    return (
        <DashboardLayout>
            <h2 className="mb-4">Users</h2>

            <input
                className="form-control mb-3"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                }}
            />
            
            <div className= "mb-3">
                <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setSortBy("name")}
                >Sort by Name</button>
                <button
                    className="btn btn-outline-secondary"
                    onClick={()=> setSortBy("username")}
                >Sort by Username</button>
                <button
                    className="btn btn-outline-danger ms-2"
                    onClick={()=> setSortBy("")}
                >Reset</button>
            </div>

            {loading && <Loader />}
            {error && <div className="alert alert-danger mt-3">
                <strong>Error:</strong>{error}
            </div>}
            
            {!loading && !error && (
                    <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Website</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    style={{cursor: "pointer"}}
                                    onClick={()=> navigate(`/users/${user.id}`)}
                                >
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.website}</td>
                                </tr>
                            ))}
                        </tbody> 
                    </table>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >Previous</button>

                <span>
                    Page {page} of {totalPages || 1}
                </span>

                <button
                    className="btn btn-outline-primary"
                    disabled={page === totalPages}
                    onClick={() => setPage((p)=> p + 1)}
                >Next</button>
            </div>
        </DashboardLayout>
    );
}