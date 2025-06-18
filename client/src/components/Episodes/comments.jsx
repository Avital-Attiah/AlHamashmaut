
import React, { useState, useEffect } from "react";
import { getCurrentUser, getData, addData, updateData, deleteData } from "../../db-api";
import Comment from "./comment.jsx"; // הקומפוננטה הבודדת לכל תגובה

export default function Comments({ episodeId, isInterview = false }) {
  const currentUser = getCurrentUser();
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getData(`comments/${episodeId}`);
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComments();
  }, [episodeId]);

  const handleAddComment = async () => {
    const content = newContent.trim();
    if (!content) return;

    const payload = {
      episodeId,
      body: content,
      connectedType: "episode",
      connectId: null,
      isQuestion: isInterview // ✅ מוסיף שדה לשמירה במסד
    };


    //

    try {
      const added = await addData("comments", payload);
      setComments(prev => [...prev, added]);
      setNewContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = (id, newBody) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, body: newBody } : c));
  };

  const handleDelete = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <h3>{isInterview ? "שאלות" : "תגובות"}</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {comments
        .filter(comment =>
          comment.connectedType === 'episode' &&
          !comment.connectId &&
          (isInterview ? comment.isQuestion : true))
        .map(comment => (

          <Comment
            key={comment.id}
            comment={comment}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}

      <div className="add-comment">
        <textarea
          placeholder={isInterview ? "הזן שאלה חדשה" : "הזן תגובה חדשה"}

          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={handleAddComment}>{isInterview ? "הוסף שאלה" : "הוסף תגובה"}</button>

      </div>
    </div>
  );
}
