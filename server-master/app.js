import express from 'express'
import usersRout  from './routs/users.js'
import episodesRout from './routs/episodes.js'
//import usertypesRout from './routs/usertypes.js'
import commentsRout from './routs/comments.js'


import cors from 'cors'


const port = process.env.port || 8080
const app=express();

app.use(cors());
app.use(express.json());
app.use('/users',usersRout);
app.use('/episodes',episodesRout);
//app.use('/usertypes',usertypesRout);
app.use('/comments',commentsRout);

app.listen(port, () => {
    console.log( `Server running on http://localhost:${port}`);
  });

