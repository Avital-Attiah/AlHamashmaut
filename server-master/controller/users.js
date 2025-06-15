
// // import { json } from 'express';
// // import {
// //     getUsersPaged,
// //     addUser,
// //     deleteUser,
// //     updateUser,
// //     getUserByEmail,
// //     verifyPassword
// // } from '../service/userData.js';
// // import jwt from 'jsonwebtoken';
// // import bcrypt from 'bcrypt';

// // export class user {

// //     // 📥 req.query: { page?: number, limit?: number }
// //     // 📤 res: JSON array of users, each: { id, userName, email, userType }
// //     getAllUsers = async (req, res) => {
// //         try {
// //             const page = parseInt(req.query.page) || 1;
// //             const limit = parseInt(req.query.limit) || 12;

// //             const users = await getUsersPaged(page, limit);
// //             res.status(200).json(users); // 🟩 200 OK
// //         } catch (error) {
// //             res.status(500).json({ message: "Failed to retrieve users" }); // ❌ 500 Internal Server Error
// //         }
// //     };



// //     login = async (req, res) => {
// //         console.log("in login ");
// //         console.log(req.body);

// //         const { email, password } = req.body;

// //         if (!email || !password) {
// //             return res.status(400).json('Missing email or password');
// //         }

// //         try {
// //             const user = await getUserByEmail(email);
// //             if (!user) {
// //                 console.log('User not found');
// //                 return res.status(404).json('not found');
// //             }



// //             console.log('password:', `"${password}"`);
// //             console.log('hash:', `"${user.passwordHash}"`);
// //             const isMatch = await bcrypt.compare(password, user.passwordHash);
// //             console.log('bcrypt result:', isMatch);

// //             if (!isMatch) {
// //                 console.log('Incorrect password');
// //                 return res.status(401).json('Unauthorized');
// //             }

// //            const { passwordHash, ...userWithoutPassword } = user;

// //             const token = jwt.sign(
// //                 {
// //                     id: user.id,
// //                     email: user.email,
// //                     userName: user.userName,
// //                     userType: user.userType
// //                 },
// //                 process.env.JWT_SECRET,
// //                 { expiresIn: '2h' }
// //             );

// //             return res.status(200).json({ user: userWithoutPassword, token });

// //         } catch (error) {
// //             console.error('Login error:', error.message);
// //             return res.status(500).json( error.message);
// //         }
// //     };

// //     // 📥 req.params: { id: string }
// //     // 📥 req.body: {
// //     //   userName?: string,
// //     //   email?: string,
// //     //   userType?: string,
// //     //   password?: string,
// //     //   lastPassword?: string
// //     // }
// //     // 📤 res: string 'updated successfully'
// //     update = async (req, res) => {
// //         try {
// //             const id = req.params.id;
// //             const { password, lastPassword } = req.body;

// //             if (password || lastPassword) {
// //                 if (!password || !lastPassword) {
// //                     return res.status(400).json({ message: 'Bad Request' }); // ❌ 400 Bad Request
// //                 }

// //                 if (!await verifyPassword(id, lastPassword)) {
// //                     return res.status(401).json({ message: 'Unauthorized' }); // ❌ 401 Unauthorized
// //                 }
// //             }

// //             await updateUser(id, req.body);
// //             res.status(200).json('updated successfully'); // 🟩 200 OK

// //         } catch (error) {
// //             console.error('Update error:', error.message);
// //             res.status(422).json({ message: 'Unprocessable Entity' }); // ❌ 422 Unprocessable Entity
// //         }
// //     };

// //     // 📥 req.body: {
// //     //   userName: string,
// //     //   email: string,
// //     //   userType: string,
// //     //   password: string
// //     // }
// //     // 📤 res: { id: number, userName, email, userType }
// //     add = async (req, res) => {
// //         try {
// //             let newUser = req.body;

// //             if (!newUser || !isValidEmail(newUser.email)) {
// //                 return res.status(400).send('Bad Request'); // ❌ 400 Bad Request
// //             }

// //             if (!newUser.password) {
// //                 return res.status(400).send('Bad Request'); // ❌ 400 Bad Request
// //             }

// //             const passwordHash = await bcrypt.hash(newUser.password, 10);
// //             const userToSave = { ...newUser, passwordHash };

// //             console.log("is ok");
// //             const userId = await addUser(userToSave);
// //             const createdUser = {
// //                 id: userId,
// //                 userName: newUser.userName,
// //                 email: newUser.email,
// //                 userType: newUser.userType
// //             };

// //             res.status(201).json(createdUser); // 🟩 201 Created

// //         } catch (error) {
// //             console.error('Add user error:', error.message);
// //             res.status(500).json('Failed to create user'); // ❌ 500 Internal Server Error
// //         }
// //     };

// //     // 📥 req.params: { id: string }
// //     // 📤 res: status 204 (no content) or 404 if not found
// //     delete = async (req, res) => {
// //         try {
// //             const userToDelete = req.params.id;
// //             const response = await deleteUser(userToDelete);

// //             if (response) {
// //                 res.status(204).send(); // 🟩 204 No Content
// //             } else {
// //                 res.status(404).json("User not found"); // ❌ 404 Not Found
// //             }
// //         } catch (error) {
// //             res.status(500).json('Failed to delete user'); // ❌ 500 Internal Server Error
// //         }
// //     };
// // }

// // // 📥 email: string → מחזירה true/false לפי תקינות אימייל
// // function isValidEmail(email) {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return emailRegex.test(email);
// // }
// import { json } from 'express';
// import {
//     getUsersPaged,
//     addUser,
//     deleteUser,
//     updateUser,
//     getUserByEmail,
//     verifyPassword
// } from '../service/userData.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// export class user {

//     /**
//      * 📥 Query: { page?: number, limit?: number }
//      * 📤 Response: JSON array of users, each: { id, userName, email, userType }
//      */
//     getAllUsers = async (req, res) => {
//         try {
//             const page = parseInt(req.query.page) || 1;
//             const limit = parseInt(req.query.limit) || 12;

//             const users = await getUsersPaged(page, limit);
//             res.status(200).json(users); // 🟩 200 OK
//         } catch (error) {
//             res.status(500).json({ message: "Failed to retrieve users" }); // ❌ 500 Internal Server Error
//         }
//     };

//     /**
//      * 📥 Body: { email: string, password: string }
//      * 📤 Response: { user: { id, email, userName, userType }, token: string }
//      */
//     login = async (req, res) => {
//         console.log("in login ");
//         console.log(req.body);

//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json('Missing email or password');
//         }

//         try {
//             const user = await getUserByEmail(email);
//             if (!user) {
//                 console.log('User not found');
//                 return res.status(404).json('not found');
//             }

//             console.log(user);
//             console.log('password:', `"${password}"`);
//             console.log('hash:', `"${user.passwordHash}"`);
//             const isMatch = await bcrypt.compare(password,user.passwordHash);
//             console.log('bcrypt result:', isMatch);

//             if (!isMatch) {
//                 console.log('Incorrect password');
//                 return res.status(401).json('Unauthorized');
//             }

//             const { passwordHash, ...userWithoutPassword } = user;

//             const token = jwt.sign(
//                 {
//                     id: user.id,
//                     email: user.email,
//                     userName: user.userName,
//                     userType: user.userType
//                 },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '2h' }
//             );

//             return res.status(200).json({ user: userWithoutPassword, token });

//         } catch (error) {
//             console.error('Login error:', error.message);
//             return res.status(500).json(error.message);
//         }
//     };

//     /**
//      * 📥 Params: { id: string }
//      * 📥 Body: {
//      *   userName?: string,
//      *   email?: string,
//      *   userType?: string,
//      *   password?: string,
//      *   lastPassword?: string
//      * }
//      * 📤 Response: string 'updated successfully'
//      */
//     update = async (req, res) => {
//         try {
//             const id = req.params.id;
//             const { password, lastPassword } = req.body;

//             if (password || lastPassword) {
//                 if (!password || !lastPassword) {
//                     return res.status(400).json({ message: 'Bad Request' }); // ❌ 400 Bad Request
//                 }

//                 const authorized = await verifyPassword(id, lastPassword);
//                 if (!authorized) {
//                     return res.status(401).json({ message: 'Unauthorized' }); // ❌ 401 Unauthorized
//                 }
//             }

//             await updateUser(id, req.body);
//             res.status(200).json('updated successfully'); // 🟩 200 OK

//         } catch (error) {
//             console.error('Update error:', error.message);
//             res.status(422).json({ message: 'Unprocessable Entity' }); // ❌ 422 Unprocessable Entity
//         }
//     };

//     /**
//      * 📥 Body: {
//      *   userName: string,
//      *   email: string,
//      *   password: string
//      * }
//      * 📤 Response: {
//      *   id: number,
//      *   userName: string,
//      *   email: string,
//      *  
//      * }
//      */
//     // add = async (req, res) => {
//     //     try {
//     //         let newUser = req.body;

//     //         if (!newUser || !isValidEmail(newUser.email)) {
//     //             return res.status(400).send('Bad Request'); // ❌ 400 Bad Request
//     //         }

//     //         if (!newUser.password) {
//     //             return res.status(400).send('Bad Request'); // ❌ 400 Bad Request
//     //         }

//     //         const passwordHash = await bcrypt.hash(newUser.password, 10);
//     //          console.log(passwordHash);
//     //         const userToSave = {
//     //             ...newUser,
//     //            passwordHash: passwordHash,
//     //             userType: 2 // 👈 ברירת מחדל קבועה
//     //         };

//     //         console.log("is ok");
//     //         const userId = await addUser(userToSave);
//     //         const createdUser = {
//     //             id: userId,
//     //             userName: newUser.userName,
//     //             email: newUser.email,
//     //         };

//     //         res.status(201).json(createdUser); // 🟩 201 Created

//     //     } catch (error) {
//     //         console.error('Add user error:', error.message);
//     //         res.status(400).json(error.message); // ❌ 500 Internal Server Error
//     //     }
//     // };
// add = async (req, res) => {
//   try {
//     const newUser = req.body;

//     if (!newUser || !isValidEmail(newUser.email)||!newUser.password) {
//       return res.status(400).send('Bad Request');
//     }

   

//     const passwordHash = await bcrypt.hash(newUser.password, 10);
//     const userToSave = {
//       ...newUser,
//       passwordHash,
//       userType: 2 // ברירת מחדל
//     };

//     const user = await addUser(userToSave);

//     // 🟢 שליפה מלאה של המשתמש אחרי הוספה
    

//     if (!user) {
//       return res.status(404).json({ message: 'משתמש לא נמצא לאחר הוספה' });
//     }

//     // 🛡️ יצירת טוקן
//     const token = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//         userName: user.userName,
//         userType: user.userType
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '2h' }
//     );

//     // ✅ החזרה לפי הדרישה שלך
//     res.status(201).json({
//       user,
//       token
//     });

//   } catch (error) {
//     console.error('Add user error:', error.message);
//     res.status(400).json({ message: error.message });
//   }
// };

//     /**
//      * 📥 Params: { id: string }
//      * 📤 Response: status 204 (No Content) או 404 אם לא נמצא
//      */
//     delete = async (req, res) => {
//         try {
//             const userToDelete = req.params.id;
//             const response = await deleteUser(userToDelete);

//             if (response) {
//                 res.status(204).send(); // 🟩 204 No Content
//             } else {
//                 res.status(404).json("User not found"); // ❌ 404 Not Found
//             }
//         } catch (error) {
//             res.status(500).json('Failed to delete user'); // ❌ 500 Internal Server Error
//         }
//     };
// }

// /**
//  * פונקציית עזר: בדיקת תקינות אימייל
//  * 📥 email: string
//  * 📤 מחזירה true אם תקין, אחרת false
//  */
// function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }
import {
  getUsersPaged,
  addUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  verifyPassword
} from '../service/userData.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * בדיקת תקינות שדות משתמש
 * @param {Object} data 
 * @param {Object} options 
 * @returns {Object} { isValid, errors }
 */
function validateUserData(data, options = { email: true, password: true, userName: false }) {
  const errors = {};

  if (options.email) {
    const email = data.email || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "המייל אינו תקני";
    }
  }

  if (options.password) {
    const password = data.password || '';
    if (password.length < 6) {
      errors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }
  }

  if (options.userName) {
    const userName = data.userName || '';
    if (!/^[\u0590-\u05FF]+$/.test(userName) || userName.length < 2) {
      errors.userName = "שם משתמש חייב להכיל לפחות 2 אותיות בעברית בלבד";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export class user {

  getAllUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const users = await getUsersPaged(page, limit);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בעת שליפת המשתמשים" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { isValid, errors } = validateUserData({ email, password });

      if (!isValid) {
        return res.status(400).json({ message: "שדות לא תקינים", errors });
      }

      const user = await getUserByEmail(email);
      if (!user) return res.status(404).json({ message: 'משתמש לא נמצא' });

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(401).json({ message: 'סיסמה שגויה' });

      const { passwordHash, ...userWithoutPassword } = user;
      const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({ user: userWithoutPassword, token });

    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'שגיאה בשרת' });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const { password, lastPassword } = req.body;

      const { isValid, errors } = validateUserData(req.body, {
        email: !!req.body.email,
        password: !!password,
        userName: !!req.body.userName
      });

      if (!isValid) {
        return res.status(400).json({ message: "שדות לא תקינים", errors });
      }

      if (password || lastPassword) {
        if (!password || !lastPassword) {
          return res.status(400).json({ message: 'חובה להזין גם סיסמה נוכחית וגם חדשה' });
        }

        const authorized = await verifyPassword(id, lastPassword);
        if (!authorized) return res.status(401).json({ message: 'סיסמה נוכחית שגויה' });
      }

      await updateUser(id, req.body);
      res.status(200).json({ message: 'המשתמש עודכן בהצלחה' });

    } catch (error) {
      console.error('Update error:', error.message);
      res.status(422).json({ message: 'שגיאה בעיבוד הנתונים' });
    }
  };

  add = async (req, res) => {
    try {
      const newUser = req.body;

      const { isValid, errors } = validateUserData(newUser, {
        email: true,
        password: true,
        userName: true
      });

      if (!isValid) {
        return res.status(400).json({ message: "שדות לא תקינים", errors });
      }

      const passwordHash = await bcrypt.hash(newUser.password, 10);
      const userToSave = {
        ...newUser,
        passwordHash,
        userType: 2
      };

      const user = await addUser(userToSave);
      if (!user) {
        return res.status(404).json({ message: 'שגיאה בשמירת המשתמש' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          userName: user.userName,
          userType: user.userType
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(201).json({ user, token });

    } catch (error) {
      console.error('Add user error:', error.message);
      const msg = error.message.includes('כבר קיים') ? error.message : 'שגיאה בעת יצירת משתמש';
      res.status(400).json({ message: msg });
    }
  };

  delete = async (req, res) => {
    try {
      const userId = req.params.id;
      const deleted = await deleteUser(userId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "משתמש לא נמצא" });
      }
    } catch (error) {
      res.status(500).json({ message: "שגיאה במחיקת משתמש" });
    }
  };
}
