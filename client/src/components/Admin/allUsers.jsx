import React, { useEffect, useState } from "react";
import { getData, updateData, deleteData } from "../../db-api";

export default function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const limit = 5;

    const fetchUsers = async (pageNumber = 1, searchText = "") => {
        try {
            setLoading(true);
            const base = `users?page=${pageNumber}&limit=${limit}`;
            const query = searchText ? `${base}&search=${encodeURIComponent(searchText)}` : base;
            const response = await getData(query);
            const fetchedUsers = Array.isArray(response) ? response : response.users || [];
            const totalCount = response.total ?? fetchedUsers.length;

            if (pageNumber === 1) setUsers(fetchedUsers);
            else setUsers((prev) => [...prev, ...fetchedUsers]);

            setTotal(totalCount);
            setPage(pageNumber);
        } catch (err) {
            setError(err.message || "שגיאה בטעינת המשתמשים");
        } finally {
            setLoading(false);
        }
    };

    // טעינה ראשונית
    useEffect(() => {
        setPage(1);
        setUsers([]);
        setTotal(0);
        fetchUsers(1);
    }, []);


    // חיפוש בזמן אמת (עם דיליי)
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsers(1, search.trim());
        }, 300);
        return () => clearTimeout(timeout);
    }, [search]);

    const handleLoadMore = () => {
        fetchUsers(page + 1, search.trim());
    };

    const promoteToAdmin = async (id) => {
        try {
            await updateData(`users/${id}`, { userType: 1 });
            fetchUsers(1, search.trim());
        } catch (err) {
            setError(err.message);
        }
    };

    const removeUser = async (id) => {
        try {
            await deleteData(`users/${id}`);
            fetchUsers(1, search.trim());
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-section">
            <h2>כל המשתמשים</h2>

            <input
                type="text"
                placeholder="חפש לפי שם או אימייל..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "1rem", padding: "0.5rem", width: "60%" }}
            />

            {error && <p className="error">{error}</p>}
            {loading && <p>טוען...</p>}

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
                            <td>{u.userType === "מנהל" ? "מנהל" : "מנוי"}</td>
                            <td>
                                {u.userType !== "מנהל" && (
                                    <button onClick={() => promoteToAdmin(u.id)}>הפוך למנהל</button>
                                )}
                                <button onClick={() => removeUser(u.id)}>מחק</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!loading && users.length < total && (
                <div style={{ marginTop: "1rem" }}>
                    <button onClick={handleLoadMore}>טען עוד משתמשים</button>
                </div>
            )}
        </div>
    );
}
