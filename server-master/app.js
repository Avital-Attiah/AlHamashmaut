import express from 'express'
import usersRout  from './routs/users.js'
import todosRout from './routs/todos.js'
import postsRout from './routs/posts.js'
import commentsRout from './routs/comments.js'


import cors from 'cors'
console.log("=== SERVER STARTED ===");

const port = process.env.port || 8080
const app=express();
app.use(cors());
app.use(express.json());
app.use('/users',usersRout);
app.use('/todos',todosRout);
app.use('/posts',postsRout);
app.use('/comments',commentsRout);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  

