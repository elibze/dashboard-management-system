import { useNavigate } from "react-router-dom";
import { memo } from "react";

function UserTable({ users }) {
    const navigate = useNavigate();
    
    function handleRowClick(id) {
        navigate(`/users/${id}`);
    }

    function handleKeyDown(event, id) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(`/users/${id}`);
        }
    }

    return (
        <div
            className="table-responsive"
            role="region"
            aria-label="Users table"
        >
            <table
                className="table table-hover table-striped align-middle"
                aria-describedby="usersTableDescription"
            >
                <caption
                    id="usersTableDescription"
                    className="text-start text-muted"
                > List of users. You can search, sort and select a user
                to view detailed information. </caption>

                <thead className="table-light">
                    <tr>
                        <th className="text-nowrap"> ID </th>
                        <th className="text-nowrap"> Name </th>
                        <th className="text-nowrap"> Username </th>
                        <th className="text-nowrap"> Email </th>
                        <th className="text-nowrap"> Company </th>
                        <th className="text-nowrap"> Website </th>
                    </tr>
                </thead>
                
                <tbody>
                    {users.map((user)=> (
                        <tr
                            key={user.id}
                            role="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRowClick(user.id)}
                            tabIndex={0}
                            onKeyDown={(event) =>
                                handleKeyDown(event, user.id)
                            }
                            aria-label={`View details for ${user.name}`}
                        >
                            <td className="text-nowrap">{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td className="text-nowrap">{user.email}</td>
                            <td>{user.company?.name || "N/A"}</td>
                            <td className="text-nowrap">
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {user.website}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default memo(UserTable);