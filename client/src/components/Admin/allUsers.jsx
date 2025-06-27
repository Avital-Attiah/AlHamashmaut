// // import React, { useEffect, useState } from "react";
// // import { getData, updateData, deleteData } from "../../db-api";

// // export default function AllUsersPage() {
// //     const [users, setUsers] = useState([]);
// //     const [error, setError] = useState("");
// //     const [page, setPage] = useState(1);
// //     const [total, setTotal] = useState(0);
// //     const [search, setSearch] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const limit = 5;

// //     const fetchUsers = async (pageNumber = 1, searchText = "") => {
// //         try {
// //             setLoading(true);
// //             const base = `users?page=${pageNumber}&limit=${limit}`;
// //             const query = searchText ? `${base}&search=${encodeURIComponent(searchText)}` : base;
// //             const response = await getData(query);
// //             const fetchedUsers = Array.isArray(response) ? response : response.users || [];
// //             const totalCount = response.total ?? fetchedUsers.length;

// //             if (pageNumber === 1) setUsers(fetchedUsers);
// //             else setUsers((prev) => [...prev, ...fetchedUsers]);

// //             setTotal(totalCount);
// //             setPage(pageNumber);
// //         } catch (err) {
// //             setError(err.message || "שגיאה בטעינת המשתמשים");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // טעינה ראשונית
// //     useEffect(() => {
// //         setPage(1);
// //         setUsers([]);
// //         setTotal(0);
// //         fetchUsers(1);
// //     }, []);


// //     // חיפוש בזמן אמת (עם דיליי)
// //     useEffect(() => {
// //         const timeout = setTimeout(() => {
// //             fetchUsers(1, search.trim());
// //         }, 300);
// //         return () => clearTimeout(timeout);
// //     }, [search]);

// //     const handleLoadMore = () => {
// //         fetchUsers(page + 1, search.trim());
// //     };

// //     const promoteToAdmin = async (id) => {
// //         try {
// //             await updateData(`users/${id}`, { userType: 1 });
// //             fetchUsers(1, search.trim());
// //         } catch (err) {
// //             setError(err.message);
// //         }
// //     };

// //     const removeUser = async (id) => {
// //         try {
// //             await deleteData(`users/${id}`);
// //             fetchUsers(1, search.trim());
// //         } catch (err) {
// //             setError(err.message);
// //         }
// //     };

// //     return (
// //         <div className="admin-section">
// //             <h2>כל המשתמשים</h2>

// //             <input
// //                 type="text"
// //                 placeholder="חפש לפי שם או אימייל..."
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 style={{ marginBottom: "1rem", padding: "0.5rem", width: "60%" }}
// //             />

// //             {error && <p className="error">{error}</p>}
// //             {loading && <p>טוען...</p>}

// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>שם</th><th>אימייל</th><th>סוג</th><th>פעולות</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {users.map(u => (
// //                         <tr key={u.id}>
// //                             <td>{u.userName}</td>
// //                             <td>{u.email}</td>
// //                             <td>{u.userType === "מנהל" ? "מנהל" : "מנוי"}</td>
// //                             <td>
// //                                 {u.userType !== "מנהל" && (
// //                                     <button onClick={() => promoteToAdmin(u.id)}>הפוך למנהל</button>
// //                                 )}
// //                                 <button onClick={() => removeUser(u.id)}>מחק</button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>

// //             {!loading && users.length < total && (
// //                 <div style={{ marginTop: "1rem" }}>
// //                     <button onClick={handleLoadMore}>טען עוד משתמשים</button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// import React, { useEffect, useState } from "react";
// import { getData, updateData, deleteData, addData } from "../../db-api";

// export default function AllUsersPage() {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState("");
//     const [page, setPage] = useState(1);
//     const [total, setTotal] = useState(0);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [messageText, setMessageText] = useState("");
//     const [userMessages, setUserMessages] = useState({}); // מיפוי הודעות פר-משתמש
//     const limit = 5;

//     const fetchUsers = async (pageNumber = 1, searchText = "") => {
//         try {
//             setLoading(true);
//             const base = `users?page=${pageNumber}&limit=${limit}`;
//             const query = searchText ? `${base}&search=${encodeURIComponent(searchText)}` : base;
//             const response = await getData(query);
//             const fetchedUsers = Array.isArray(response) ? response : response.users || [];
//             const totalCount = response.total ?? fetchedUsers.length;

//             if (pageNumber === 1) setUsers(fetchedUsers);
//             else setUsers((prev) => [...prev, ...fetchedUsers]);

//             setTotal(totalCount);
//             setPage(pageNumber);
//         } catch (err) {
//             setError(err.message || "שגיאה בטעינת המשתמשים");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setPage(1);
//         setUsers([]);
//         setTotal(0);
//         fetchUsers(1);
//     }, []);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             fetchUsers(1, search.trim());
//         }, 300);
//         return () => clearTimeout(timeout);
//     }, [search]);

//     const handleLoadMore = () => {
//         fetchUsers(page + 1, search.trim());
//     };

//     const promoteToAdmin = async (id) => {
//         try {
//             await updateData(`users/${id}`, { userType: 1 });
//             fetchUsers(1, search.trim());
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const removeUser = async (id) => {
//         try {
//             await deleteData(`users/${id}`);
//             fetchUsers(1, search.trim());
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const sendMessageToUser = async (recipientId) => {
//         const body = userMessages[recipientId]?.trim();
//         if (!body) return;

//         try {
//             await addData("messages", {
//                 recipientId,
//                 body
//             });
//             setUserMessages(prev => ({ ...prev, [recipientId]: "" }));
//             alert("ההודעה נשלחה בהצלחה!");
//         } catch (err) {
//             setError("שליחת ההודעה נכשלה");
//         }
//     };

//     const sendMessageToAll = async () => {
//         if (!messageText.trim()) return;

//         try {
//             await addData("messages", { body: messageText }); // ללא recipientId = שליחה לכולם
//             setMessageText("");
//             alert("ההודעה נשלחה לכל המשתמשים!");
//         } catch (err) {
//             setError("שליחת ההודעה נכשלה");
//         }
//     };

//     return (
//         <div className="admin-section">
//             <h2>כל המשתמשים</h2>

//             <input
//                 type="text"
//                 placeholder="חפש לפי שם או אימייל..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{ marginBottom: "1rem", padding: "0.5rem", width: "60%" }}
//             />

//             {error && <p className="error">{error}</p>}
//             {loading && <p>טוען...</p>}

//             <table>
//                 <thead>
//                     <tr>
//                         <th>שם</th><th>אימייל</th><th>סוג</th><th>פעולות</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(u => (
//                         <tr key={u.id}>
//                             <td>{u.userName}</td>
//                             <td>{u.email}</td>
//                             <td>{u.userType === "מנהל" ? "מנהל" : "מנוי"}</td>
//                             <td>
//                                 {u.userType !== "מנהל" && (
//                                     <button onClick={() => promoteToAdmin(u.id)}>הפוך למנהל</button>
//                                 )}
//                                 <button onClick={() => removeUser(u.id)}>מחק</button>
//                                 <div style={{ marginTop: "5px" }}>
//                                     <textarea
//                                         placeholder="הקלד הודעה למשתמש זה..."
//                                         rows={2}
//                                         value={userMessages[u.id] || ""}
//                                         onChange={(e) => setUserMessages(prev => ({ ...prev, [u.id]: e.target.value }))}
//                                     />
//                                     <button onClick={() => sendMessageToUser(u.id)}>שלח הודעה</button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {!loading && users.length < total && (
//                 <div style={{ marginTop: "1rem" }}>
//                     <button onClick={handleLoadMore}>טען עוד משתמשים</button>
//                 </div>
//             )}

//             <hr style={{ margin: "2rem 0" }} />
//             <h3>שליחת הודעה לכל המשתמשים:</h3>
//             <textarea
//                 rows={3}
//                 placeholder="כתוב כאן את ההודעה הכללית..."
//                 style={{ width: "60%", padding: "0.5rem" }}
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//             />
//             <br />
//             <button onClick={sendMessageToAll}>שלח הודעה לכל המשתמשים</button>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import { getData, updateData, deleteData, addData } from "../../db-api";
import MessageBox from "./messageBox.jsx";
// import "../style/MessageBox.css";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [userMessages, setUserMessages] = useState({});
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

  useEffect(() => {
    setPage(1);
    setUsers([]);
    setTotal(0);
    fetchUsers(1);
  }, []);

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

  const sendMessageToUser = async (recipientId) => {
    const body = userMessages[recipientId]?.trim();
    if (!body) return;

    try {
      await addData("messages", { recipientId, body });
      setUserMessages(prev => ({ ...prev, [recipientId]: "" }));
      alert("ההודעה נשלחה בהצלחה!");
    } catch (err) {
      setError("שליחת ההודעה נכשלה");
    }
  };

  const sendMessageToAll = async () => {
    if (!messageText.trim()) return;

    try {
      await addData("messages", { body: messageText });
      setMessageText("");
      alert("ההודעה נשלחה לכל המשתמשים!");
    } catch (err) {
      setError("שליחת ההודעה נכשלה");
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
                <MessageBox
                  value={userMessages[u.id] || ""}
                  onChange={(val) => setUserMessages(prev => ({ ...prev, [u.id]: val }))}
                  onSend={() => sendMessageToUser(u.id)}
                  placeholder="כתוב הודעה למשתמש זה..."
                  buttonText="שלח למשתמש"
                />
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

      <hr style={{ margin: "2rem 0" }} />
      <h3>שליחת הודעה לכל המשתמשים:</h3>
      <MessageBox
        value={messageText}
        onChange={setMessageText}
        onSend={sendMessageToAll}
        placeholder="כתוב הודעה כללית לכל המשתמשים..."
        buttonText="שלח לכולם"
      />
    </div>
  );
}
