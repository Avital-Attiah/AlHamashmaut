
import express from 'express'
import {post} from '../controller/posts.js'
import authenticateToken from '../service/authMiddleware.js';
const postsRout=express.Router();
const postController=new post();
postsRout.get('/',authenticateToken,postController.getAll);
postsRout.put('/:id',authenticateToken,postController.updatePost);
postsRout.delete('/:id',authenticateToken,postController.deletePost);
postsRout.post('/',authenticateToken,postController.addPost);
export default postsRout;

