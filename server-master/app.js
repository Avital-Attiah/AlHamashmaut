// import express from 'express'
// import usersRout  from './routs/users.js'
// import episodesRout from './routs/episodes.js'
// //import usertypesRout from './routs/usertypes.js'
// import commentsRout from './routs/comments.js'


// import cors from 'cors'


// const port = process.env.port || 8080
// const app=express();

// app.use(cors());
// app.use(express.json());
// app.use('/users',usersRout);
// app.use('/episodes',episodesRout);
// //app.use('/usertypes',usertypesRout);
// app.use('/comments',commentsRout);

// app.listen(port, () => {
//     console.log( `Server running on http://localhost:${port}`);
//   });
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import usersRout from './routs/users.js';
import episodesRout from './routs/episodes.js';
import commentsRout from './routs/comments.js';
import cors from 'cors';
import fs from 'fs';

const port = process.env.PORT || 8080;
const app = express();

// הגדרה ל־__dirname בסביבת ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// ראוטים עיקריים
app.use('/users', usersRout);
app.use('/episodes', episodesRout);
app.use('/comments', commentsRout);

/// 🆕 ראוט להצגת תמונה בודדת מתוך uploads/episodes
app.get('/episodes/image/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'episodes', req.params.filename);

  // בדיקה אם הקובץ קיים לפני שליחה
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('התמונה לא נמצאה');
    }

    res.sendFile(filePath);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

