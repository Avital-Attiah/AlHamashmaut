// // file: routs/imageRoutes.js
// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // 🔹 /episodes/image/:filename
// router.get('/episodes/image/:filename', (req, res) => {
//   const filePath = path.join(__dirname, '..', 'uploads', 'episodes', req.params.filename);
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) return res.status(404).send('התמונה לא נמצאה');
//     res.sendFile(filePath);
//   });
// });

// // 🔹 /users/image/:filename
// router.get('/users/image/:filename', (req, res) => {
//   const filePath = path.join(__dirname, '..', 'uploads', 'users', req.params.filename);
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) return res.status(404).send('התמונה לא נמצאה');
//     res.sendFile(filePath);
//   });
// });

// // 🔹 /pic/:filename
// router.get('/pic/:filename', (req, res) => {
//   const filePath = path.join(__dirname, '..', 'pic', req.params.filename);
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       console.log(filePath, 'התמונה לא נמצאה');
//       return res.status(404).send('התמונה לא נמצאה');
//     }
//     console.log("success pic");
//     res.sendFile(filePath);
//   });
// });

// export default router;
// file: routs/imageRoutes.js
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🔹 /episodes/image/:filename
router.get('/episodes/image/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', 'episodes', req.params.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send('התמונה לא נמצאה');
    res.sendFile(filePath);
  });
});

// 🔹 /users/image/:filename
router.get('/users/image/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', 'users', req.params.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send('התמונה לא נמצאה');
    res.sendFile(filePath);
  });
});

// 🔹 /pic/:filename
router.get('/pic/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'pic', req.params.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(filePath, 'התמונה לא נמצאה');
      return res.status(404).send('התמונה לא נמצאה');
    }
    res.sendFile(filePath);
  });
});

export default router;