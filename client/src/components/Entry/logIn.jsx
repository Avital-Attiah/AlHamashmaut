

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../db-api";
import "../../style/logInStyle.css";
import { useModal } from "../../AppContext.jsx"; // הוסף
import Register from "./register.jsx";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { closeModal, openModal } = useModal();


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login("users/login", { email, password });
      if (res) closeModal();
    } catch (err) {
      setError("אימייל או סיסמה שגויים!");
    }
  };

  const handleRegisterClick = () => {
    // navigate("/register")
     openModal(<Register />, "/register");

  };

  return (
    <div className="login-container fade-in">
      <h1 className="login-title">התחברות</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-icon-group">
          <span className="icon">📧</span>
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-icon-group">
          <span className="icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="submit-button">התחבר</button>
      </form>

      <button onClick={handleRegisterClick} className="register-button">הרשם</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

