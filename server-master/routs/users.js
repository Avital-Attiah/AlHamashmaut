import express from 'express'
import {user} from '../controller/users.js'
import {authenticateToken ,isAdmin,isOwn }from '../service/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
const usersRout=express.Router();
const userController=new user();

usersRout.post('/new', upload.single('profilePic'), userController.add);
usersRout.put('/:id', authenticateToken , upload.single('profilePic'), userController.update);
 usersRout.post('/login',userController.login)
  usersRout.get('/',authenticateToken,userController.getAllUsers)
  usersRout.get('/:id',authenticateToken,isOwn,userController.getUserDetailes);
  // usersRout.get('/:id',userController.getUserDetailes);


// usersRout.post('/new',userController.add);
//חדש לחלוטין
usersRout.delete('/:id', authenticateToken && isAdmin, userController.delete);
// usersRout.put('/:id', authenticateToken && isAdmin, userController.update);
// usersRout.post('/check', userController.checkUserName);

export default usersRout;