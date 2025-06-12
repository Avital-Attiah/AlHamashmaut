
import { json } from 'express';
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

export class user {

    // 📥 req.query: { page?: number, limit?: number }
    // 📤 res: JSON array of users, each: { id, userName, email, userType }
    getAllUsers = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 12;

            const users = await getUsersPaged(page, limit);
            res.status(200).json(users); // 🟩 200 OK
        } catch (error) {
            res.status(500).json({ message: "Failed to retrieve users" }); // ❌ 500 Internal Server Error
        }
    };



    login = async (req, res) => {
        console.log("in login ");
        console.log(req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json('Missing email or password');
        }

        try {
            const user = await getUserByEmail(email);
            if (!user) {
                console.log('User not found');
                return res.status(404).json('not found');
            }



            console.log('password:', `"${password}"`);
            console.log('hash:', `"${user.passwordHash}"`);
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            console.log('bcrypt result:', isMatch);

            if (!isMatch) {
                console.log('Incorrect password');
                return res.status(401).json('Unauthorized');
            }

           const { passwordHash, ...userWithoutPassword } = user;

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

            return res.status(200).json({ user: userWithoutPassword, token });

        } catch (error) {
            console.error('Login error:', error.message);
            return res.status(500).json( error.message);
        }
    };

    // 📥 req.params: { id: string }
    // 📥 req.body: {
    //   userName?: string,
    //   email?: string,
    //   userType?: string,
    //   password?: string,
    //   lastPassword?: string
    // }
    // 📤 res: string 'updated successfully'
    update = async (req, res) => {
        try {
            const id = req.params.id;
            const { password, lastPassword } = req.body;

            if (password || lastPassword) {
                if (!password || !lastPassword) {
                    return res.status(400).json({ message: 'Bad Request' }); // ❌ 400 Bad Request
                }

                if (!await verifyPassword(id, lastPassword)) {
                    return res.status(401).json({ message: 'Unauthorized' }); // ❌ 401 Unauthorized
                }
            }

            await updateUser(id, req.body);
            res.status(200).json('updated successfully'); // 🟩 200 OK

        } catch (error) {
            console.error('Update error:', error.message);
            res.status(422).json({ message: 'Unprocessable Entity' }); // ❌ 422 Unprocessable Entity
        }
    };

    // 📥 req.body: {
    //   userName: string,
    //   email: string,
    //   userType: string,
    //   password: string
    // }
    // 📤 res: { id: number, userName, email, userType }
    add = async (req, res) => {
        try {
            let newUser = req.body;

            if (!newUser || !isValidEmail(newUser.email)) {
                return res.status(400).send('Bad Request'); // ❌ 400 Bad Request
            }

            if (!newUser.password) {
                return res.status(400).send('Bad Request'); // ❌ 400 Bad Request
            }

            const passwordHash = await bcrypt.hash(newUser.password, 10);
            const userToSave = { ...newUser, passwordHash };

            console.log("is ok");
            const userId = await addUser(userToSave);
            const createdUser = {
                id: userId,
                userName: newUser.userName,
                email: newUser.email,
                userType: newUser.userType
            };

            res.status(201).json(createdUser); // 🟩 201 Created

        } catch (error) {
            console.error('Add user error:', error.message);
            res.status(500).json('Failed to create user'); // ❌ 500 Internal Server Error
        }
    };

    // 📥 req.params: { id: string }
    // 📤 res: status 204 (no content) or 404 if not found
    delete = async (req, res) => {
        try {
            const userToDelete = req.params.id;
            const response = await deleteUser(userToDelete);

            if (response) {
                res.status(204).send(); // 🟩 204 No Content
            } else {
                res.status(404).json("User not found"); // ❌ 404 Not Found
            }
        } catch (error) {
            res.status(500).json('Failed to delete user'); // ❌ 500 Internal Server Error
        }
    };
}

// 📥 email: string → מחזירה true/false לפי תקינות אימייל
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
