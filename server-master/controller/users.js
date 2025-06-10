import { json } from 'express';
import { getUsersPaged, addUser, deleteUser, updateUser, getPassword, getUserByEmail } from '../service/userData.js'
import jwt from 'jsonwebtoken';

export class user {

// getAllUsers=async(req, res)=>{
// try {
//       console.log('in get all');

//       const users = await getAllUsers();
//       console.log(users);
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ message: "  " });
//     }
// }
  getAllUsers = async (req, res) => {
  try {
    console.log('in get all');

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const users = await getUsersPaged(page, limit);

    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשליפת המשתמשים" });
  }
};
    // login = async (req, res) => {
    //     console.log('in get user');

    //     const { email, password } = req.body; // שימו לב ל-query במקום params
    //     console.log(email);

    //     if (!email || !password) {
    //         return res.status(400).json('חסר מידע');
    //     }

    //     try {
    //         const user = await getUserByEmail(email);


    //         if (!user) {
    //             return res.status(401).json('המשתמש לא קיים');
    //         }

    //         // const realPassword = await getPassword(user.id);

    //         const isMatch = await bcrypt.compare(password, user.passwordHash);

    //         if (isMatch) {

    //             const token = jwt.sign(
    //                 { id: user.id, email: user.email, username: user.username, userType: user.userType },
    //                 process.env.JWT_SECRET,
    //                 { expiresIn: '2h' } //כמות הזמן
    //             );
    //             return res.status(200).json({ user, token });

    //         }
    //         else
    //             return res.status(409).json('Conflict');


    //     } catch (error) {
    //         console.error('שגיאה ב-postuser:', error.message);

    //         return res.status(500).json(error.message);
    //     }
    // };

login = async (req, res) => {
    console.log('in get user');

    const { email, password } = req.body;
    console.log(email);

    if (!email || !password) {
        return res.status(400).json('חסר מידע');
    }

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json('המשתמש לא קיים');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (isMatch) {
            const { passwordHash, ...userWithoutPassword } = user;

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    userType: user.userType
                },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            return res.status(200).json({ user: userWithoutPassword, token });
        } else {
            return res.status(409).json('סיסמה שגויה');
        }

    } catch (error) {
        console.error('שגיאה ב-login:', error.message);
        return res.status(500).json(error.message);
    }
};


    // update = async (req, res) => {
    //     try {
    //         const { email, username, password, lastPassword } = req.body;
    //         let id = req.params.id;
    //         let response = await updateUser(id, req.body);
    //         console.log(' עודכן בהצלחה');
    //         res.status(200).json('פרטי המשתמש עודכנו בהצלחה');

    //     } catch (error) {
    //         res.status(500).json(error.message);

    //     }

    // }

    update = async (req, res) => {
  try {
    const id = req.params.id;
    await updateUser(id, req.body);
    res.status(200).json('User details updated successfully');
  } catch (error) {
    console.error('Update error:', error.message);
    res.status(500).json({ message: 'An error occurred while updating user' });
  }
};

    add = async (req, res) => {
        try {
            let newUser = req.body;
            if (newUser == null || !isValidEmail(newUser.email))
                res.status(500).send('נתוני המשתמש בלתי אפשריים');
            let userId = await addUser(newUser);
            newUser = { ...newUser, id: userId }
            console.log(newUser);
            res.json([newUser]); // מגדיר גם את הסטטוס וגם התוכן כ־JSON

        } catch (error) {
            res.status(500).json(error.message);

        }
    }
    delete = async (req, res) => {
        try {
            let userToDelete = req.params.id;
            let response = await deleteUser(userToDelete);

            if (response) {
                console.log('נמחק בהצלחה');
                res.status(200).json("המשתמש נמחק בהצלחה");
            } else {
                res.status(404).json("משתמש לא נמצא");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
