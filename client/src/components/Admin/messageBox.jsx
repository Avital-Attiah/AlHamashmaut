import React from "react";
// import "../../style/messageBoxStyle.css";


export default function MessageBox({ value, onChange, onSend, placeholder = "הקלד הודעה...", buttonText = "שלח הודעה" }) {
  return (
    <div className="message-box">
       <div className="page-container">
      <textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSend}>{buttonText}</button>
    </div>
    </div>
  );
}
