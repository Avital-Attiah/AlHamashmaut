
// AppContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/modelStyle.css'
const ModalContext = createContext();


import { useEffect } from "react";
import Login from "./components/Entry/logIn.jsx";
import Register from "./components/Entry/register.jsx";
export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
   const [previousPath, setPreviousPath] = useState(null); // ✅ נוסיף משתנה
  const navigate = useNavigate();
const modelsPath=['/login','/register']
  const openModal = (content, path) => {
    setModalContent(content);
     setPreviousPath(window.location.pathname);
    if (path) {
    //   window.history.pushState({ modal: true }, "", path);
    window.history.replaceState({ modal: true }, "", path);

    }
  };
const closeModal = () => {
  setModalContent(null);
  if (previousPath&&!modelsPath.includes(previousPath)) {
    window.location.href = previousPath; // רענון מלא לדף הקודם
  } else {
    window.location.href = "/"; // ברירת מחדל
  }
};

useEffect(() => {
  const handlePopState = () => {
    setModalContent(null);
  };

  window.addEventListener("popstate", handlePopState);

  // בדיקה חד־פעמית - רק ברינדור הראשון
  const path = window.location.pathname;
  if (modelsPath.includes(path)) {
    window.history.replaceState({ modal: true }, "", '/');
    closeModal();
  }

  return () => window.removeEventListener("popstate", handlePopState);
}, []); // ← שימי לב: רק array ריק!


  return (
    <ModalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>❌</button>
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
export const useModal = () => useContext(ModalContext);
