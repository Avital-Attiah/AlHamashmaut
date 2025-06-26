import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newUser, getCurrentUser } from "../../db-api";
import "../../style/registerStyle.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const validateUserName = (value) => {
    if (!/^[\u0590-\u05FF]+$/.test(value) || value.length < 2) {
      setUserNameError("שם משתמש חייב להכיל לפחות 2 אותיות בעברית בלבד");
      return false;
    }
    setUserNameError("");
    return true;
  };

  const validateEmail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("המייל אינו תקני");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("הסיסמה חייבת להיות לפחות 6 תווים");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateVerifyPassword = (value) => {
    if (value !== password) {
      setVerifyError("הסיסמאות אינן תואמות");
      return false;
    }
    setVerifyError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const valid = [
      validateUserName(userName),
      validateEmail(email),
      validatePassword(password),
      validateVerifyPassword(verifyPassword)
    ].every(Boolean);

    if (!valid) {
      setGeneralError("יש לתקן את השדות המסומנים");
      return;
    }

    try {
      await newUser("users/new", { userName, email, password });
      const user = getCurrentUser();
      if (user) {
        navigate(`/`);
      } else {
        setGeneralError("שגיאה באימות המשתמש לאחר הרישום");
      }
    } catch (err) {
      console.log(err);
      setGeneralError("שגיאה במהלך הרישום: " + err.message);
    }
  };

  return (
    <div className="register-container fade-in">
      <h1 className="register-title">רישום</h1>
      <form onSubmit={handleRegister} className="register-form">

        <div className="input-icon-group">
          <span className="icon">👤</span>
          <input
            type="text"
            placeholder="שם משתמש"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              validateUserName(e.target.value);
            }}
            className="input-field"
          />
        </div>
        {userNameError && <div className="error-message">{userNameError}</div>}

        <div className="input-icon-group">
          <span className="icon">📧</span>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className="input-field"
          />
        </div>
        {emailError && <div className="error-message">{emailError}</div>}

        <div className="input-icon-group">
          <span className="icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
              validateVerifyPassword(verifyPassword);
            }}
            className="input-field"
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {passwordError && <div className="error-message">{passwordError}</div>}

        <div className="input-icon-group">
          <span className="icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Verify Password"
            value={verifyPassword}
            onChange={(e) => {
              setVerifyPassword(e.target.value);
              validateVerifyPassword(e.target.value);
            }}
            className="input-field"
          />
        </div>
        {verifyError && <div className="error-message">{verifyError}</div>}

        <button type="submit" className="submit-button">רשום</button>
        <button type="button" onClick={() => navigate("/login")} className="login-button">התחבר</button>
      </form>

      {generalError && <div className="error-message">{generalError}</div>}
    </div>
  );
};

export default Register;
