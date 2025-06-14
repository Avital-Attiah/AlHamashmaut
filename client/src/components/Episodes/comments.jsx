
import React, { useState, useEffect } from "react";
import { getCurrentUser, getData, addData, updateData, deleteData } from "../../db-api";
import Comment from "./comment.jsx"; // הקומפוננטה הבודדת לכל תגובה

export default function Comments({ postId }) {
  const currentUser = getCurrentUser();
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getData(`comments?post_id=${postId}`);
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    const content = newContent.trim();
    if (!content) return;

    const payload = {
      post_id: postId,
      user_id: currentUser.id,
      content
    };

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
      <h3>תגובות</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}

      <div className="add-comment">
        <textarea
          placeholder="הזן תגובה חדשה"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={handleAddComment}>הוסף תגובה</button>
      </div>
    </div>
  );
}
