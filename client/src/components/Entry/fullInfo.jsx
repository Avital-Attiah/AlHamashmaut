// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../../style/fullInfoStyle.css";
// import { useUser } from "../../UserContext";

// function FullInfo() {
//   const location = useLocation();
//   const { email, password } = location.state || {};

//   if (!userName || !password) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
//         לא הועברו נתונים מההרשמה. נא לחזור לעמוד הרישום.
//       </div>
//     );
//   }

//   const [formData, setFormData] = useState({
//     userName: userName || "",
//     email: "",
//     password: password || "",
//   });

//   const { setUser } = useUser();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch("http://localhost:8080/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: formData.userName,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       if (response.ok) {
//         const newUserArr = await response.json();
//         const newUser = newUserArr[0];
//         setUser(newUser);
//         localStorage.setItem("user", JSON.stringify(newUser));
//         setSuccess("המשתמש נוסף בהצלחה!");
//         navigate(`/${newUser.userName}/${newUser.id}/home`);
//       } else {
//         const msg = await response.text();
//         setError("שגיאה בהוספת המשתמש: " + msg);
//       }
//     } catch (error) {
//       setError("שגיאה בהתחברות לשרת: " + error.message);
//     }
//   };

//   return (
//     <div className="full-info-container">
//       <h2 className="full-info-title">השלמת הרשמה</h2>
//       <form onSubmit={handleSubmit} className="full-info-form">
//         <label>שם משתמש:</label>
//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           required
//           className="full-info-input"
//         />

//         <label>אימייל:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="full-info-input"
//         />

//         <button type="submit" className="full-info-button">שלח</button>

//         {error && <p className="full-info-error">{error}</p>}
//         {success && <p className="full-info-success">{success}</p>}
//       </form>
//     </div>
//   );
// }

// export default FullInfo;
