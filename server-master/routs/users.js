import express from 'express'
import {user} from '../controller/users.js'
import {authenticateToken ,isAdmin }from '../service/authMiddleware.js';
const usersRout=express.Router();
const userController=new user();
 usersRout.post('/login',userController.login)
  usersRout.get('/',authenticateToken&&isAdmin,userController.getAllUsers)
usersRout.post('/new',userController.add);
//חדש לחלוטין
usersRout.delete('/:id', authenticateToken && isAdmin, userController.delete);
usersRout.put('/:id', authenticateToken && isAdmin, userController.update);
// usersRout.post('/check', userController.checkUserName);

export default usersRout;
