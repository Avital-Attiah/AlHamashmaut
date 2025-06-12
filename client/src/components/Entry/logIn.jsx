import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userExist } from "../../db-api";
import { useUser } from "../../UserContext";
import '../../style/logInStyle.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // קריאה לפונקציה שבודקת אם המשתמש קיים לפי אימייל
    var existUser = await userExist(email, password, setError);
    if (existUser) {
      localStorage.setItem("user", JSON.stringify(existUser[0]));
      setUser(existUser[0]);
      navigate(`/${existUser[0].userName}/${existUser[0].id}/home`);
    } else {
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
