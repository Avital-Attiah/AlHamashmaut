import React, { useState, useEffect } from "react";
import { getCurrentUser, getData, addData, updateData, deleteData } from "../../db-api";
import Comment from "./comment.jsx";

export default function Comments({ episodeId, isInterview = false }) {
  const currentUser = getCurrentUser();
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 7;

  useEffect(() => {
    setComments([]);
    setPage(0);
    fetchMoreComments(0);
  }, [episodeId]);

  const fetchMoreComments = async (pageNum) => {
    try {
      const offset = pageNum * limit;
      const res = await getData(`comments/${episodeId}?limit=${limit}&offset=${offset}`);
      const newComments = res.comments || [];
      const totalCount = res.total || 0;

      setComments((prev) => [...prev, ...newComments]);
      setPage(pageNum);
      setTotal(totalCount);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddComment = async () => {
    const content = newContent.trim();
    if (!content) return;

    const payload = {
      episodeId,
      body: content,
      connectedType: "episode",
      connectId: null,
      isQuestion: isInterview
    };

    try {
      const added = await addData("comments", payload);
      setComments((prev) => [
        ...prev,
        {
          ...added,
          userName: currentUser.userName,
          userType: currentUser.userType
        }
      ]);
      setNewContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = (id, newBody) => {
    setComments((prev) => prev.map(c => c.id === id ? { ...c, body: newBody } : c));
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter(c => c.id !== id));
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

      {comments.length < total && (
        <button onClick={() => fetchMoreComments(page + 1)} style={{
          marginTop: '1rem',
          padding: '0.4rem 1rem',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          טען עוד תגובות
        </button>
      )}

      {currentUser ? (
        <div className="add-comment">
          <textarea
            placeholder={isInterview ? "הזן שאלה חדשה" : "כתוב תגובה"}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleAddComment}>
            {isInterview ? "הוסף שאלה" : "הוסף תגובה"}
          </button>
        </div>
      ) : (
        <p className="comment-warning">
          🛈 רק משתמשים מחוברים יכולים להוסיף {isInterview ? "שאלות" : "תגובות"}.
          <br />
          <strong>התחבר כדי להשתתף בדיון!</strong>
        </p>
      )}
    </div>
  );
}
