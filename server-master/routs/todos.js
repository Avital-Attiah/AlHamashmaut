import express from 'express'
import {todo} from '../controller/todos.js'
import authenticateToken from '../service/authMiddleware.js';

const todosRout=express.Router();
const todoController=new todo();

//  todosRout.get('/:id',todoController.gettodo)
todosRout.get('/', authenticateToken, todoController.getAll);
todosRout.post('/', authenticateToken, todoController.add);
todosRout.delete('/:id', authenticateToken, todoController.delete);
todosRout.put('/:id', authenticateToken, todoController.update);

export default todosRout;

