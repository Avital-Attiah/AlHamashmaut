
// // import { useState, useEffect } from 'react';
// // import { updateData, getCurrentUser } from '../../db-api.jsx';
// // import { useNavigate } from 'react-router-dom';

// // export default function ProfilePage() {
// //     const [user, setUser] = useState(null);
// //     const [form, setForm] = useState({ userName: '', email: '' });
// //     const [picFile, setPicFile] = useState(null);
// //     const [previewUrl, setPreviewUrl] = useState(null);
// //     const [error, setError] = useState(null);
// //     const [isEditing, setIsEditing] = useState(false);

// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const current = getCurrentUser();
// //         if (current) {
// //             setUser(current);
// //             setForm({ userName: current.userName || '', email: current.email || '' });
// //             if (current.profilePic && !current.profilePic.startsWith("data:")) {
// //                 setPreviewUrl(`http://localhost:8080/users/image/${current.profilePic}`);
// //             } else {
// //                 setPreviewUrl(current.profilePic || null);
// //             }
// //         }
// //     }, []);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!user?.id) {
// //             setError("משתמש לא תקין");
// //             return;
// //         }

// //         setError(null);
// //         const fd = new FormData();
// //         fd.append('userName', form.userName.trim());
// //         fd.append('email', form.email.trim());
// //         if (picFile) {
// //             fd.append('profilePic', picFile);
// //         } else if (user.profilePic) {
// //             fd.append('existingPicture', user.profilePic);
// //         }

// //         try {
// //             for (let pair of fd.entries()) {
// //                 console.log(pair[0] + ': ' + pair[1]);
// //             }

// //             const updated = await updateData(`users/${user.id}`, fd, true);
// //             if (!updated || updated.error) {
// //                 throw new Error(updated?.error || "עדכון נכשל");
// //             }

// //             const updatedUser = {
// //                 ...user,
// //                 userName: form.userName.trim(),
// //                 email: form.email.trim(),
// //                 profilePic: updated.profilePic || user.profilePic,
// //             };

// //             setUser(updatedUser);
// //             localStorage.setItem("currentUser", JSON.stringify(updatedUser));
// //             setPreviewUrl(
// //                 updatedUser.profilePic.startsWith("data:")
// //                     ? updatedUser.profilePic
// //                     : `http://localhost:8080/users/image/${updatedUser.profilePic}`
// //             );
// //             alert("הפרופיל עודכן בהצלחה");
// //             setIsEditing(false);
// //         } catch (err) {
// //             setError(err.message || "שגיאה בעדכון הפרופיל");
// //         }
// //     };

// //     const handlePictureChange = (e) => {
// //         const file = e.target.files[0];
// //         if (file && !file.type.startsWith("image/")) {
// //             setError("יש לבחור קובץ תמונה");
// //             return;
// //         }
// //         setPicFile(file);
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setPreviewUrl(reader.result);
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     if (!user) return <div>טוען פרופיל...</div>;

// //     return (
// //         <div>
// //             <h2>הפרופיל שלי</h2>
// //             <img src={previewUrl || '/default-avatar.png'} alt="avatar" width={120} />
// //             {isEditing && <input type="file" onChange={handlePictureChange} />}

// //             <hr />

// //             {isEditing ? (
// //                 <form onSubmit={handleSubmit}>
// //                     <label>שם משתמש:</label>
// //                     <input
// //                         type="text"
// //                         value={form.userName}
// //                         onChange={(e) => setForm({ ...form, userName: e.target.value })}
// //                         required
// //                     />

// //                     <label>אימייל:</label>
// //                     <input
// //                         type="email"
// //                         value={form.email}
// //                         onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                         required
// //                     />

// //                     {error && <div className="error">{error}</div>}

// //                     <button type="submit">שמירה</button>
// //                     <button type="button" onClick={() => setIsEditing(false)}>ביטול</button>
// //                 </form>
// //             ) : (
// //                 <div>
// //                     <p><strong>שם משתמש:</strong> {user.userName}</p>
// //                     <p><strong>אימייל:</strong> {user.email}</p>
// //                     <button onClick={() => setIsEditing(true)}>ערוך</button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// import { useState, useEffect } from 'react';
// import { updateData, getCurrentUser } from '../../db-api.jsx';
// import { useNavigate } from 'react-router-dom';

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [form, setForm] = useState({ userName: '', email: '' });
//   const [picFile, setPicFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const current = getCurrentUser();
//     if (current) {
//       setUser(current);
//       setForm({
//         userName: current.userName || '',
//         email: current.email || '',
//       });
//       setPreviewUrl(
//         current.profilePic?.startsWith('data:')
//           ? current.profilePic
//           : `http://localhost:8080/users/image/${current.profilePic}`
//       );
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user?.id) {
//       setError("משתמש לא תקין");
//       return;
//     }

//     setError(null);
//     const fd = new FormData();
//     fd.append('userName', form.userName.trim());
//     fd.append('email', form.email.trim());
//     if (picFile) {
//       fd.append('profilePic', picFile);
//     } else if (user.profilePic) {
//       fd.append('existingPicture', user.profilePic);
//     }

//     try {
//       const updated = await updateData(`users/${user.id}`, fd, true);
//       if (!updated || updated.error) {
//         throw new Error(updated?.error || "עדכון נכשל");
//       }

//       // בניית כתובת תצוגה
//       const finalPreviewUrl = previewUrl?.startsWith('data:')
//         ? previewUrl
//         : `http://localhost:8080/users/image/${updated.profilePic || user.profilePic}`;

//       const updatedUser = {
//         ...user,
//         userName: form.userName.trim(),
//         email: form.email.trim(),
//         profilePic: finalPreviewUrl, // שמירה כתמונה מלאה
//       };

//       setUser(updatedUser);
//       setPreviewUrl(finalPreviewUrl);
//       localStorage.setItem("currentUser", JSON.stringify(updatedUser));
//       alert("הפרופיל עודכן בהצלחה");
//       setIsEditing(false);
//     } catch (err) {
//       setError(err.message || "שגיאה בעדכון הפרופיל");
//     }
//   };

//   const handlePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file && !file.type.startsWith("image/")) {
//       setError("יש לבחור קובץ תמונה");
//       return;
//     }
//     setPicFile(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result); // תמונת base64
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   if (!user) return <div>טוען פרופיל...</div>;

//   return (
//     <div>
//       <h2>הפרופיל שלי</h2>
//       <img src={previewUrl || '/default-avatar.png'} alt="avatar" width={120} />
//       {isEditing && <input type="file" onChange={handlePictureChange} />}
//       <hr />

//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <label>שם משתמש:</label>
//           <input
//             type="text"
//             value={form.userName}
//             onChange={e => setForm({ ...form, userName: e.target.value })}
//             required
//           />

//           <label>אימייל:</label>
//           <input
//             type="email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//             required
//           />

//           {error && <div className="error">{error}</div>}

//           <button type="submit">שמירה</button>
//           <button type="button" onClick={() => setIsEditing(false)}>ביטול</button>
//         </form>
//       ) : (
//         <div>
//           <p><strong>שם משתמש:</strong> {user.userName}</p>
//           <p><strong>אימייל:</strong> {user.email}</p>
//           <button onClick={() => setIsEditing(true)}>ערוך</button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { updateData, getCurrentUser, getData } from '../../db-api.jsx';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ userName: '' });
  const [picFile, setPicFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentUser();
    if (current) {
      setUser(current);
      setForm({ userName: current.userName || '' });
      setPreviewUrl(
        current.profilePic?.startsWith('data:')
          ? null
          : `http://localhost:8080/users/image/${current.profilePic}`
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setError("משתמש לא תקין");
      return;
    }

    setError(null);
    const fd = new FormData();
    fd.append('userName', form.userName.trim());
    if (picFile) {
      fd.append('profilePic', picFile);
    } else if (user.profilePic) {
      fd.append('existingPicture', user.profilePic);
    }

    try {
      const updated = await updateData(`users/${user.id}`, fd, true);
      if (!updated || updated.error) {
        throw new Error(updated?.error || "עדכון נכשל");
      }
      const updateUser=await getData(`users/${user.id}`)

   

      setUser(updateUser);
      localStorage.setItem("currentUser", JSON.stringify(updateUser));
      setPreviewUrl(`http://localhost:8080/users/image/${updateUser.profilePic}`);
      alert("הפרופיל עודכן בהצלחה");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "שגיאה בעדכון הפרופיל");
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("יש לבחור קובץ תמונה");
      return;
    }
    setPicFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // לתצוגה בלבד
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return <div>טוען פרופיל...</div>;

  return (
    <div>
      <h2>הפרופיל שלי</h2>
      <img src={previewUrl || '/default-avatar.png'} alt="avatar" width={120} />
      {isEditing && <input type="file" onChange={handlePictureChange} />}
      <hr />

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>שם משתמש:</label>
          <input
            type="text"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            required
          />

          {/* אימייל רק לתצוגה, ללא שינוי */}
          <p><strong>אימייל:</strong> {user.email}</p>

          {error && <div className="error">{error}</div>}

          <button type="submit">שמירה</button>
          <button type="button" onClick={() => setIsEditing(false)}>ביטול</button>
        </form>
      ) : (
        <div>
          <p><strong>שם משתמש:</strong> {user.userName}</p>
          <p><strong>אימייל:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>ערוך</button>
        </div>
      )}
    </div>
  );
}
