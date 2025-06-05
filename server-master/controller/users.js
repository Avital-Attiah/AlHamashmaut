import { json } from 'express';
import { getAllUsers, addUser, deleteUser, updateUser, getPassword, getUserByEmail } from '../service/userData.js'
import jwt from 'jsonwebtoken';

export class user {


    postUser = async (req, res) => {
        console.log('in get user');

        const { email, password } = req.body; // שימו לב ל-query במקום params
        console.log(email);

        if (!email || !password) {
            return res.status(400).json('חסר מידע');
        }

        try {
            const user = await getUserByEmail(email);


            if (!user) {
                return res.status(401).json('המשתמש לא קיים');
            }
            console.log(user.id)
            const realPassword = await getPassword(user.id);
            console.log(realPassword);
            console.log(password);
            // const isMatch = await bcrypt.compare(password, realPassword);

            if (password!=realPassword) {
                return res.status(401).json('סיסמה לא נכונה');
            }
console.log('1111 11111');
            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username },
               process.env.JWT_SECRET,
                { expiresIn: '1h' } //כמות הזמן
            );

console.log('everthing ok');
            return res.status(200).json({ user, token });

        } catch (error) {
            console.error('שגיאה ב-postuser:', error.message);
          
            return res.status(500).json(error.message);
        }
    };



    update = async (req, res) => {
        try {
            const { email, username, password, lastPassword } = req.body;
            //    if(lastPassword!=getPassword().body.password)
            //     throw new new Error('הסיסמאות אינם תואמות');
            let id = req.params.id;
            let response = await updateUser(id, req.body);
            console.log(' עודכן בהצלחה');
            res.status(200).json('פרטי המשתמש עודכנו בהצלחה');

        } catch (error) {
            res.status(500).json(error.message);

        }

    }
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
