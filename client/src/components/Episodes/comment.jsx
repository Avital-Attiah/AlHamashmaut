

import React, { useState } from 'react';
import { getCurrentUser, updateData, deleteData, addData, getData } from '../../db-api';
import '../../style/commentStyle.css';
import '../../style/global.css'

export default function Comment({ comment, onUpdate, onDelete, isInterview }) {
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
      isQuestion: !!isInterview,
      userId: currentUser.id
    };


    try {
      const added = await addData("comments", payload);
      setReplies(prev => [
        ...prev,
        {
          ...added,
          userName: currentUser.userName,
          userType: currentUser.userType // ✨ מוסיף את הסוג של המשתמש
        }
      ]);

      setReplyContent("");
      setReplyMode(false);
      setShowReplies(true);
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
        <strong>
          {comment.userType === "מנהל" ? "🤴🏼 " : ""}
          {comment.userName}
        </strong>
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
        {currentUser && (
          <button onClick={() => setReplyMode(!replyMode)}>
            {replyMode ? "בטל" : isInterview ? "השב לשאלה" : "השב"}
          </button>
        )}
        <button onClick={loadReplies}>
          {showReplies ? "הסתר תגובות" : "הצג תגובות"}
        </button>
      </div>

      {replyMode && currentUser && (
        <div className="reply-box">
          <textarea
            placeholder={isInterview ? "הזן שאלה חדשה" : "הזן תגובה חדשה"}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={handleAddReply}>{isInterview ? "הוסף שאלה" : "הוסף תגובה"}</button>
        </div>
      )}
      {replyMode && !currentUser && (
        <p className="comment-warning">
          🛈 התחברות נדרשת כדי להשיב לתגובה זו.
        </p>
      )}


      {showReplies && replies.length > 0 && (
        <div className="reply-list">
          {replies.map(r => (
            <Comment
              key={r.id}
              comment={r}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isInterview={isInterview}
            />
          ))}
        </div>
      )}
    </div>
  );
}

