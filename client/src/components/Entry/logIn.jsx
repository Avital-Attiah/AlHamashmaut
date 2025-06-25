import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../db-api"; // לא צריך getCurrentUser כאן
import '../../style/logInStyle.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // login מחזיר true אם ההתחברות הצליחה, אחרת זורק שגיאה
      const isLogin = await login("users/login", { email, password });

      if (isLogin) {
        navigate("/"); // מעבר לדף הראשי
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("אימייל או סיסמה שגויים!");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">התחברות</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">התחבר</button>
      </form>
      <button onClick={handleRegisterClick} className="register-button">הרשם</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
