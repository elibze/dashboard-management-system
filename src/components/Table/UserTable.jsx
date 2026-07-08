import { useNavigate } from "react-router-dom";

export default function UserTable({ users }) {
    const navigate = useNavigate();
    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Username </th>
                        <th> Email </th>
                        <th> Website </th>
                    </tr>
                </thead>
                
                <tbody>
                    {users.map((user)=> (
                        <tr
                            key={user.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/users/${user.id}`)}
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
    );
}