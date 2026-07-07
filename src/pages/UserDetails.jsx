import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Loader from "../components/Loader/Loader";
import { fetchGraphQL } from "../graphql/client";
import { GET_USER } from "../graphql/queries/userDetails";

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUser() {
            try {
                setLoading(true);

                const data = await fetchGraphQL(GET_USER, { id });

                setUser(data.user);
                setError("");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, [id]);

    if (loading) return <Loader />;

    if (error) {
        return (
            <DashboardLayout>
                <div className="alert alert-danger">
                    <strong>Error:</strong>{error}</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-4">
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={()=> navigate("/users")}
                > Back </button>
            
                <h2 className="text-center">User Details</h2>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h4>{user.name}</h4>
                    <hr />

                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong>{user.username}</p>
                    <p><strong>Email:</strong>{user.email}</p>
                    <p><strong>Phone:</strong>{user.phone}</p>
                    <p><strong>Website:</strong>{user.website}</p>

                    <hr />

                    <h5>Company</h5>

                    <p><strong>Name:</strong>{user.company?.name}</p>
                    <p><strong>Catchphrase:</strong>{user.company?.catchPhrase}</p>
                    
                    <hr />

                    <h5>Address</h5>

                    <p>
                        {user.address?.street}, {user.address?.suite}
                    </p>

                    <p>
                        {user.address?.city}, {user.address?.zipcode}
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}