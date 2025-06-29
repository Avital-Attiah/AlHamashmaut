
// import { useEffect, useState } from 'react';
// import { getData, updateData, deleteData, getCurrentUser } from '../../db-api';
// import '../../style/personalMessageStyle.css';
// import { useOutletContext } from 'react-router-dom';

// export default function MessagesPage() {
//   const user = getCurrentUser();
//   const [messages, setMessages] = useState([]);
//   const [view, setView] = useState('new'); // 'new' or 'history'
//   const { refreshUnread } = useOutletContext();

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const all = await getData("messages");
//       setMessages(all || []);
//     } catch (e) {
//       console.error("שגיאה בשליפת הודעות", e);
//     }
//   };

//   const markAsRead = async (msg) => {
//     if (!msg.isRead) {
//       await updateData(`messages/${msg.id}/read`, {});
//       await fetchMessages();
//       refreshUnread();
//     }
//   };

//   const filteredMessages = messages.filter(m => {
//     if (view === 'new') return !m.isRead;
//     if (view === 'history') return m.isRead;
//     return false;
//   });

//   return (
//     <div className="messages-container">
//       <div className="message-tabs">
//         <button
//           className={view === 'new' ? 'active' : ''}
//           onClick={() => setView('new')}
//         >
//           🆕 הודעות חדשות
//         </button>
//         <button
//           className={view === 'history' ? 'active' : ''}
//           onClick={() => setView('history')}
//         >
//           📜 היסטוריית הודעות
//         </button>
//       </div>

//       <main className="messages-main">
//         <h2>{view === 'new' ? "הודעות חדשות" : "היסטוריית הודעות"}</h2>
//         {filteredMessages.length === 0 && <p>אין הודעות להצגה.</p>}

//         {filteredMessages.map(msg => (
//           <div key={msg.id} className={`message-card ${msg.isRead ? 'read' : 'unread'}`}>
//             <div className="message-header">
//               <img
//                 src={msg.senderId === null
//                   ? "/images/profile-placeholder.png"
//                   : `http://localhost:8080/users/image/${msg.profilePic}`
//                 }
//                 alt="שולח"
//                 className="message-avatar"
//               />
//               <div>
//                 <div className="sender-name">
//                   {msg.senderId === null ? "הנהלת האתר" : msg.senderName}
//                   {msg.senderRole === 'מנהל' && (
//                     <span className="admin-tag">הודעת מערכת</span>
//                   )}
//                 </div>
//                 <small>{new Date(msg.createdAt).toLocaleString()}</small>
//               </div>
//             </div>

//             <div className="message-body">{msg.body}</div>

//             {view === 'new' && (
//               <button
//                 className="action-button"
//                 onClick={() => markAsRead(msg)}
//               >
//                 סמן כנקראה
//               </button>
//             )}
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { getData, updateData, deleteData, getCurrentUser } from '../../db-api';
import '../../style/personalMessageStyle.css';
import { useOutletContext } from 'react-router-dom';

export default function MessagesPage() {
  const user = getCurrentUser();
  const [messages, setMessages] = useState([]);
  const [view, setView] = useState('new'); // 'new' or 'history'
  const { refreshUnread } = useOutletContext();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const all = await getData("messages");
      setMessages(all || []);
    } catch (e) {
      console.error("שגיאה בשליפת הודעות", e);
    }
  };

  const markAsRead = async (msg) => {
    if (!msg.isRead) {
      await updateData(`messages/${msg.id}/read`, {});
      await fetchMessages();
      refreshUnread();
    }
  };

  const filteredMessages = messages.filter(m => {
    if (view === 'new') return !m.isRead;
    if (view === 'history') return m.isRead;
    return false;
  });

  return (
    <div className="messages-container responsive full-width">
      <aside className="messages-sidebar">
        <button
          className={view === 'new' ? 'active' : ''}
          onClick={() => setView('new')}
        >
          🆕 הודעות חדשות
        </button>
        <button
          className={view === 'history' ? 'active' : ''}
          onClick={() => setView('history')}
        >
          📜 היסטוריית הודעות
        </button>
      </aside>

      <main className="messages-main">
        <h2>{view === 'new' ? "הודעות חדשות" : "היסטוריית הודעות"}</h2>
        {filteredMessages.length === 0 && <p>אין הודעות להצגה.</p>}

        {filteredMessages.map(msg => (
          <div key={msg.id} className={`message-card ${msg.isRead ? 'read' : 'unread'} full-width-card`}>
            <div className="message-header">
              <img
                src={msg.senderId === null
                  ? "/images/profile-placeholder.png"
                  : `http://localhost:8080/users/image/${msg.profilePic}`
                }
                alt="שולח"
                className="message-avatar"
              />
              <div>
                <div className="sender-name">
                  {msg.senderId === null ? "הנהלת האתר" : msg.senderName}
                  {msg.senderRole === 'מנהל' && (
                    <span className="admin-tag">הודעת מערכת</span>
                  )}
                </div>
                <small>{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
            </div>

            <div className="message-body center-text full-width-content">{msg.body}</div>

            {view === 'new' && (
              <button
                className="action-button"
                onClick={() => markAsRead(msg)}
              >
                סמן כנקראה
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
