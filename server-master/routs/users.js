import express from 'express'
import {user} from '../controller/users.js'
const usersRout=express.Router();
const userController=new user();
 usersRout.post('/login',userController.postUser)
usersRout.post('/',userController.add);
//בפרויקט זה לא בשימוש
// usersRout.delete('/:id',userController.delete);
// usersRout.put('/:id',userController.update);
export default usersRout;