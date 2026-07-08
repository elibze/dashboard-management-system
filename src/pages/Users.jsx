import { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Loader from "../components/Loader/Loader";
import UserTable from "../components/Table/UserTable";
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
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    
    const usersPerPage = 10;
    
    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                const data = await fetchGraphQL(GET_USERS);
                const userData = data.users.data;
                setUsers(userData);
                setError("");
            } catch (err) {
                setError(
                    err.message || "Failed to load users."
                );
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    const filteredUsers = users.filter((user)=> {
        const searchValue = search.toLowerCase();

        return (
            user.name
                .toLowerCase()
                .includes(searchValue)
            ||
            user.email
                .toLowerCase()
                .includes(searchValue)
        );
    });

    const sortedUsers = [...filteredUsers].sort(
        (a,b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === "username") {
                return a.username.localeCompare(b.username);
            }
            return 0;
        }
    );

    const totalPages = Math.ceil(
        sortedUsers.length / usersPerPage
    );

    const currentUsers = sortedUsers.slice(
        (page-1)*usersPerPage,
        page*usersPerPage
    );


    return (
        <DashboardLayout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">
                    Users
                    <span className="badge bg-primary ms-2">{filteredUsers.length}</span>
                </h2>
            </div>

            <input
                className="form-control mb-3"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e)=> {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            <div className="mb-3">
                <button 
                    className="btn btn-outline-secondary me-2"
                    onClick={()=> setSortBy("name")}
                >Sort by Name</button>
                <button
                    className="btn btn-outline-secondary me-2"
                    onClick={()=> setSortBy("username")}
                >Sort by Username</button>
                <button
                    className="btn btn-outline-danger"
                    onClick={()=> setSortBy("")}
                >Reset</button>
            </div>

            {loading && <Loader />}

            {error && (
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    {currentUsers.length === 0 ? (
                        <div className="alert alert-warning">
                            No users found.
                        </div>
                    ) : ( 
                        <UserTable users={currentUsers} />
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button
                            className="btn btn-outline-primary"
                            disabled={page===1}
                            onClick={()=> setPage(page-1)}
                        >Previous</button>
                        <span>Page {page} of {totalPages || 1} </span>
                        <button
                            className="btn btn-outline-primary"
                            disabled={page >= totalPages}
                            onClick={()=> setPage(page+1)}
                        >Next</button>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}