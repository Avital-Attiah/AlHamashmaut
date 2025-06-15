import React, { useState } from 'react';
import { getCurrentUser, updateData, deleteData } from '../../db-api'; // או הנתיב הנכון אצלך

export default function comment({ comment, onUpdate, onDelete }) {
  const currentUser = getCurrentUser();
  const isOwner = currentUser?.id === comment.adminId;

  const [editMode, setEditMode] = useState(false);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      await updateData(`comments/${comment.id}`, { body: editedBody });
      onUpdate && onUpdate(comment.id, editedBody); // לעדכן ברשימה הראשית
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteData(`comments/${comment.id}`);
      if (success && onDelete) onDelete(comment.id); // הסרה מרשימת תגובות
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.commentBox}>
      <div style={styles.header}>
        <strong>{comment.username }</strong>
        <span style={styles.date}>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>

      {editMode ? (
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          style={styles.textArea}
        />
      ) : (
        <p style={styles.body}>{comment.body}</p>
      )}

      {error && <div style={styles.error}>{error}</div>}

      {isOwner && (
        <div style={styles.actions}>
          {editMode ? (
            <>
              <button onClick={handleUpdate}>שמור</button>
              <button onClick={() => setEditMode(false)}>בטל</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditMode(true)}>ערוך</button>
              <button onClick={handleDelete}>מחק</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  commentBox: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: '0.8em',
    color: '#999',
  },
  body: {
    margin: '10px 0',
  },
  textArea: {
    width: '100%',
    height: '60px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
  },
};
