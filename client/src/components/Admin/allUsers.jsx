// allUsers.jsx
import React, { useEffect, useState } from "react";
import { getData, updateData, deleteData } from "../../db-api";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getData("users");
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteToAdmin = async (id) => {
    try {
      await updateData(`users/${id}`, { userType: 1 });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteData(`users/${id}`);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <h2>כל המשתמשים</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>שם</th><th>אימייל</th><th>סוג</th><th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.userName}</td>
              <td>{u.email}</td>
              <td>{u.userType === 1 ? "מנהל" : "מנוי"}</td>
              <td>
                {u.userType !== 1 && <button onClick={() => promoteToAdmin(u.id)}>הפוך למנהל</button>}
                <button onClick={() => removeUser(u.id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
