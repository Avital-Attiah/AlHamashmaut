// import { useEffect, useState } from 'react';
// import { getData, updateData, addData, getCurrentUser } from '../../db-api.jsx';
// // import '../../style/messagesPageStyle.css';

// export default function MessagesPage() {
//   const [messages, setMessages] = useState([]);
//   const [body, setBody] = useState("");
//   const [recipientId, setRecipientId] = useState("");
//   const user = getCurrentUser();

//   const fetchMessages = async () => {
//     const data = await getData("messages");
//     setMessages(data);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const markRead = async (id) => {
//     await updateData(`messages/${id}/read`, {});
//     setMessages(m => m.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
//   };

//   const sendMessage = async () => {
//     if (!body || (!recipientId && user.userType !== 1)) {
//       alert("אנא הזן תוכן הודעה ונמען חוקי");
//       return;
//     }

//     await addData("messages", {
//       recipientId: recipientId || null,
//       body
//     });

//     setBody("");
//     setRecipientId("");
//     alert("הודעה נשלחה בהצלחה");
//     fetchMessages();
//   };

//   return (
//     <div className="messages-page">
//       <h2>📩 ההודעות שלי</h2>
//       <button className="refresh-btn" onClick={fetchMessages}>🔄 רענון</button>

//       <div className="message-list">
//         {messages.length === 0 && <p>אין הודעות להצגה</p>}

//         {messages.map(m => (
//           <div
//             key={m.id}
//             className={`message-item ${m.isRead ? "read" : ""}`}
//           >
//             <div><b>מאת:</b> {m.senderName || "מערכת"}</div>
//             <div className="message-body">{m.body}</div>
//             <small>{new Date(m.createdAt).toLocaleString()}</small>
//             {!m.isRead && (
//               <button onClick={() => markRead(m.id)}>סמן כנקראה</button>
//             )}
//           </div>
//         ))}
//       </div>

//       <hr />
//       <div className="message-form">
//         <h3>✉️ שליחת הודעה חדשה</h3>
//         {user.userType === 1 && (
//           <input
//             placeholder="מזהה נמען (ID) או השאר ריק לשליחת הודעה לכל המשתמשים"
//             value={recipientId}
//             onChange={e => setRecipientId(e.target.value)}
//           />
//         )}
//         <textarea
//           placeholder="תוכן ההודעה"
//           value={body}
//           onChange={e => setBody(e.target.value)}
//           rows={3}
//         />
//         <button onClick={sendMessage}>📤 שלח הודעה</button>
//       </div>
//     </div>
//   );
// }
