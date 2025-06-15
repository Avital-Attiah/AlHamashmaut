import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login ,getCurrentUser} from "../../db-api";

import '../../style/logInStyle.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // קריאה לפונקציה שבודקת אם המשתמש קיים לפי אימייל
    try{
  var islogin = await login("users/login",{email:email, password:password});
    if (islogin) {
      const user=getCurrentUser();
      navigate(`/${user.userName}/${user.id}/home`);
    } else {
      setError("אימייל או סיסמה שגויים!");
    }
    }catch(error)
    {
      console.log(error); 
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
