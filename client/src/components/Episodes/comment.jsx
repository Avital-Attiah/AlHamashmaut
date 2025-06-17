// import React, { useState } from 'react';
// import { getCurrentUser, updateData, deleteData } from '../../db-api'; 
// import '../../style/commentStyle.css'; 

// export default function comment({ comment, onUpdate, onDelete }) {
//   const currentUser = getCurrentUser();
//   const isOwner = currentUser?.id === comment.adminId;

//   const [editMode, setEditMode] = useState(false);
//   const [editedBody, setEditedBody] = useState(comment.body);
//   const [error, setError] = useState(null);

//   const handleUpdate = async () => {
//     try {
//       await updateData(`comments/${comment.id}`, { body: editedBody });
//       onUpdate && onUpdate(comment.id, editedBody); // לעדכן ברשימה הראשית
//       setEditMode(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const success = await deleteData(`comments/${comment.id}`);
//       if (success && onDelete) onDelete(comment.id); // הסרה מרשימת תגובות
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={styles.commentBox}>
//       <div style={styles.header}>
//         <strong>{comment.username }</strong>
//         <span style={styles.date}>{new Date(comment.createdAt).toLocaleString()}</span>
//       </div>

//       {editMode ? (
//         <textarea
//           value={editedBody}
//           onChange={(e) => setEditedBody(e.target.value)}
//           style={styles.textArea}
//         />
//       ) : (
//         <p style={styles.body}>{comment.body}</p>
//       )}

//       {error && <div style={styles.error}>{error}</div>}

//       {isOwner && (
//         <div style={styles.actions}>
//           {editMode ? (
//             <>
//               <button onClick={handleUpdate}>שמור</button>
//               <button onClick={() => setEditMode(false)}>בטל</button>
//             </>
//           ) : (
//             <>
//               <button onClick={() => setEditMode(true)}>ערוך</button>
//               <button onClick={handleDelete}>מחק</button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   commentBox: {
//     borderBottom: '1px solid #ccc',
//     padding: '10px',
//     marginBottom: '10px',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   date: {
//     fontSize: '0.8em',
//     color: '#999',
//   },
//   body: {
//     margin: '10px 0',
//   },
//   textArea: {
//     width: '100%',
//     height: '60px',
//   },
//   actions: {
//     display: 'flex',
//     gap: '10px',
//   },
//   error: {
//     color: 'red',
//     fontSize: '0.9em',
//   },
// };


// components/comment.jsx
// components/comment.jsx
import React, { useState } from 'react';
import { getCurrentUser, updateData, deleteData, addData, getData } from '../../db-api'; 
import '../../style/commentStyle.css'; 

export default function Comment({ comment, onUpdate, onDelete }) {
  const currentUser = getCurrentUser();
  const isOwner = currentUser?.id === comment.userId;

  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      await updateData(`comments/${comment.id}`, { body: editedBody });
      onUpdate && onUpdate(comment.id, editedBody);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteData(`comments/${comment.id}`);
      if (success && onDelete) onDelete(comment.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddReply = async () => {
    const body = replyContent.trim();
    if (!body) return;

    const payload = {
      episodeId: comment.episodeId,
      body,
      connectedType: "comment",
      connectId: comment.id,
    };

    try {
      await addData("comments", payload);
      setReplyContent("");
      setReplyMode(false);
      setShowReplies(true);
      loadReplies();
    } catch (err) {
      setError(err.message);
    }
  };

  const loadReplies = async () => {
    try {
      const res = await getData(`comments/connect/${comment.id}`);
      setReplies(res);
      setShowReplies(!showReplies);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-header">
        <strong>{comment.username}</strong>
        <span className="comment-date">
          {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}
        </span>
      </div>

      {editMode ? (
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          className="comment-textarea"
        />
      ) : (
        <p className="comment-body">{comment.body}</p>
      )}

      {error && <div className="comment-error">{error}</div>}

      <div className="comment-actions">
        {isOwner && (
          editMode ? (
            <>
              <button onClick={handleUpdate}>שמור</button>
              <button onClick={() => setEditMode(false)}>בטל</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditMode(true)}>ערוך</button>
              <button onClick={handleDelete}>מחק</button>
            </>
          )
        )}
        <button onClick={() => setReplyMode(!replyMode)}>
          {replyMode ? "בטל תגובה" : "השב"}
        </button>
        <button onClick={loadReplies}>
          {showReplies ? "הסתר תגובות" : "הצג תגובות"}
        </button>
      </div>

      {replyMode && (
        <div className="reply-box">
          <textarea
            placeholder="כתוב תגובה..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={handleAddReply}>שלח</button>
        </div>
      )}

      {showReplies && replies.length > 0 && (
        <div className="reply-list">
          {replies.map(r => (
            <Comment
              key={r.id}
              comment={r}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
