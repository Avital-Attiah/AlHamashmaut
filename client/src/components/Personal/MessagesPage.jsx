// import { useEffect, useState } from 'react';
// import { getData, updateData, addData, getCurrentUser } from '../../db-api.jsx';

// export default function MessagesPage() {
//   const [messages, setMessages] = useState([]);
//   const [body, setBody] = useState("");
//   const [recipientId, setRecipientId] = useState("");
//   const user = getCurrentUser();

//   useEffect(() => {
//     getData("messages").then(setMessages);
//   }, []);

//   const markRead = async id => {
//     await updateData(`messages/${id}/read`, {});
//     setMessages(m => m.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
//   };

//   const sendMessage = async () => {
//     if (!body) return;
//     await addData("messages", { recipientId, body });
//     setBody("");
//     alert("הודעה נשלחה");
//   };

//   return (
//     <div>
//       <h2>ההודעות שלי</h2>
//       {messages.map(m => (
//         <div key={m.id} style={{ border: '1px solid', margin: 5, padding: 10, background: m.isRead ? '#eee' : '#ddf' }}>
//           <div><b>מאת:</b> {m.senderName || "מערכת"}</div>
//           <div>{m.body}</div>
//           {!m.isRead && <button onClick={() => markRead(m.id)}>סמן כנקרא</button>}
//         </div>
//       ))}

//       <hr />
//       <h3>שליחת הודעה</h3>
//       <input placeholder="מזהה נמען (ID)" value={recipientId} onChange={e => setRecipientId(e.target.value)} />
//       <textarea value={body} onChange={e => setBody(e.target.value)} />
//       <button onClick={sendMessage}>שלח הודעה</button>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { getData, updateData, addData, getCurrentUser } from '../../db-api.jsx';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const user = getCurrentUser();

  const fetchMessages = async () => {
    const data = await getData("messages");
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    await updateData(`messages/${id}/read`, {});
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
  };

  const sendMessage = async () => {
    if (!body || (!recipientId && user.userType !== 1)) {
      alert("אנא הזן תוכן הודעה ונמען חוקי");
      return;
    }

    await addData("messages", {
      recipientId: recipientId || null, // null = הודעה גלובלית
      body
    });

    setBody("");
    setRecipientId("");
    alert("הודעה נשלחה בהצלחה");
    fetchMessages();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>📩 ההודעות שלי</h2>
      <button onClick={fetchMessages}>🔄 רענון</button>

      {messages.length === 0 && <p>אין הודעות להצגה</p>}

      {messages.map(m => (
        <div
          key={m.id}
          style={{
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: 10,
            borderRadius: 8,
            background: m.isRead ? '#f5f5f5' : '#e0f0ff'
          }}
        >
          <div><b>מאת:</b> {m.senderName || "מערכת"}</div>
          <div style={{ marginTop: 6 }}>{m.body}</div>
          <small style={{ display: 'block', marginTop: 8, color: '#666' }}>
            {new Date(m.createdAt).toLocaleString()}
          </small>
          {!m.isRead && (
            <button onClick={() => markRead(m.id)} style={{ marginTop: 5 }}>
              סמן כנקראה
            </button>
          )}
        </div>
      ))}

      <hr />
      <h3>✉️ שליחת הודעה חדשה</h3>
      {user.userType === 1 && (
        <input
          placeholder="מזהה נמען (ID) או השאר ריק לשליחת הודעה לכל המשתמשים"
          value={recipientId}
          onChange={e => setRecipientId(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
      )}
      <textarea
        placeholder="תוכן ההודעה"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={3}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={sendMessage}>📤 שלח הודעה</button>
    </div>
  );
}
