// import {
//   getAll,
//   addEpisode as addEpisodesToDB,
//   updateEpisode as updateEpisodesInDB,
//   deleteEpisode as deleteEpisodesFromDB,
//   getEpisodesById
// } from "../service/episodesData.js";


// // פונקציית ולידציה לבדוק תקינות של פוסט
// const validateEpisode = (episode, user) => {
//   const errors = [];
//   if (!episode.title || typeof episode.title !== "string" || episode.title.trim().length < 3) {
//     errors.push("יש להזין כותרת תקינה (לפחות 3 תווים)");
//   }
//   // if (episode.adminId !== user.id) {
//   //   errors.push("אין הרשאה");
//   // }
// console.log(errors);
//   return errors;
// };


// export   class episode {
//   // שליפת כל הפוסטים
//   getAll = async (req, res) => {
//     try {
//       console.log('in get all ');
// //להפוך מSTRIMG לINT
// const isFutureInterview = req.query.isFutureInterview=='true' ;

//       const episodes = await getAll(isFutureInterview);
//       console.log(episodes);
//       res.status(200).json(episodes);
//     } catch (error) {
//       res.status(500).json({ message: "שגיאה בשליפת הפוסטים" });
//     }
//   };

//   addEpisode = async (req, res) => {
//   const episode = {
//     ...req.body,
//     picture: req.file ? req.file.filename : null,
//     adminId: req.user.id // או מאיפה שאת מביאה
//   };

//   const errors = validateEpisode(episode, req.user);
//   if (errors.length > 0) {
//     return res.status(400).json({ errors });
//   }

//   try {
//     const id = await addEpisodesToDB(episode);
//     const newEpisode = { ...episode, id };
//     res.status(201).json([newEpisode]);
//   } catch (error) {
//     res.status(500).json({ message: "שגיאה בהוספת הפוסט" });
//   }
// };

// //   // הוספת פוסט חדש
// //   addEpisode = async (req, res) => {
// //     // const episode = req.body;
// //     const episode = {
// //   ...req.body,
// //   picture: req.file ? req.file.filename : null, // או עם הנתיב אם את רוצה full path
// // };

// //     const errors = validateEpisode(episode,req.user);

// //     if (errors.length > 0) {
// //       return res.status(400).json({ errors });
// //     }

// //     try {
// //       const id = await addEpisodesToDB(episode);
// //       const newEpisode = { ...episode, id: id };
// //       res.status(201).json([newEpisode]);
// //     } catch (error) {
// //       res.status(500).json({ message: "שגיאה בהוספת הפוסט" });
// //     }
// //   };

//   // עדכון פוסט קיים לפי ID
// //   updateEpisode = async (req, res) => {
// //     // console.log('in update episode req\:',req);
// //     const { id } = req.params;
// //     const updatedEpisode = req.body;
// //     console.log(updatedEpisode);
// //     const errors = validateEpisode(updatedEpisode,req.user);
// // console.log('inUpdate');
// //     if (errors.length > 0) {
// //       console.log("problem in valid");
// //       return res.status(400).json({ errors });
// //     }

// //     try {
// //       const success = await updateEpisodesInDB(id, updatedEpisode);
// //       if (success) {
// //         res.status(200).json("הפוסט עודכן בהצלחה");
// //       } else {
// //         console.log("problem in db")
// //         res.status(404).json("פוסט לא נמצא");
// //       }
// //     } catch (error) {
// //       res.status(500).json("שגיאה בעדכון הפוסט");
// //     }
// //   };
// // updateEpisode = async (req, res) => {
// //   const { id } = req.params;

// //   // עדכון ידני של התמונה החדשה אם קיימת
// //   const updatedEpisode = {
// //     ...req.body,
// //     picture: req.file ? req.file.filename : req.body.existingPicture || null,
// //   };

// //   const errors = validateEpisode(updatedEpisode, req.user);
// //   if (errors.length > 0) {
// //     return res.status(400).json({ errors });
// //   }

// //   try {
// //     const success = await updateEpisodesInDB(id, updatedEpisode);
// //     if (success) {
// //       res.status(200).json("הפרק עודכן בהצלחה");
// //     } else {
// //       res.status(404).json("פרק לא נמצא");
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json("שגיאה בעדכון הפרק");
// //   }
// // };
// updateEpisode = async (req, res) => {
//   const { id } = req.params;

//   const updatedEpisode = {
//     ...req.body,
//     picture: req.file ? req.file.filename : req.body.existingPicture || null,
//     isFutureInterview: req.body.isFutureInterview === 'true' || req.body.isFutureInterview === true ? 1 : 0,
//   };

//   const errors = validateEpisode(updatedEpisode, req.user);
//   if (errors.length > 0) {
//     return res.status(400).json({ errors });
//   }

//   try {
//     const success = await updateEpisodesInDB(id, updatedEpisode);
//     if (success) {
//       res.status(200).json("הפרק עודכן בהצלחה");
//     } else {
//       res.status(404).json("פרק לא נמצא");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json("שגיאה בעדכון הפרק");
//   }
// };
//   // מחיקת פוסט לפי ID
//   deleteEpisode = async (req, res) => {
//     const { id } = req.params;
//   const episode = await getEpisodesById(id);
// if (req.adminId !== episode.adminId) {
//   return res.status(403).json("אין הרשאה");
// }
//     try {
//       const success = await deleteEpisodesFromDB(id);
//       if (success) {
//         res.status(200).json("הפוסט נמחק בהצלחה");
//       } else {
//         res.status(404).json("פוסט לא נמצא");
//       }
//     } catch (error) {
//       res.status(500).json("שגיאה במחיקת הפוסט");
//     }
//   };
// }
// const getepisodesByIdController = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const episode = await getEpisodesById(id);
//     res.status(200).json([episode]);
//   } catch (error) {
//     res.status(500).json("שגיאה בשליפת הפוסט");
//   }
// };

// export { getepisodesByIdController };
/**
 * 🎮 episode Controller
 * כולל: getAll, addEpisode, updateEpisode, deleteEpisode
 */

import {
  getAll,
  addEpisode as addEpisodesToDB,
  updateEpisode as updateEpisodesInDB,
  deleteEpisode as deleteEpisodesFromDB,
  getEpisodesById
} from "../service/episodesData.js";

// ולידציה לפרק
const validateEpisode = (episode, user) => {
  const errors = [];
  if (!episode.title || typeof episode.title !== "string" || episode.title.trim().length < 3) {
    errors.push("יש להזין כותרת תקינה (לפחות 3 תווים)");
  }
  return errors;
};

export class episode {
  /**
   * 📥 Query: ?isFutureInterview=boolean
   * 📤 Response: Array of episodes
   */
  getAll = async (req, res) => {
    try {
      const isFutureInterview = req.query.isFutureInterview === 'true';
      const episodes = await getAll(isFutureInterview);
      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בשליפת הפוסטים" });
    }
  };

  /**
   * 📥 Body: { title, body, picture (optional), isFutureInterview (optional) }
   * 📤 Response: Array with inserted episode
   */
  addEpisode = async (req, res) => {
    const episode = {
      ...req.body,
      picture: req.file ? req.file.filename : null,
      isFutureInterview: req.body.isFutureInterview === 'true' || req.body.isFutureInterview === true ? 1 : 0,
      adminId: req.user.id
    };

    const errors = validateEpisode(episode, req.user);
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const id = await addEpisodesToDB(episode);
      res.status(201).json([{ ...episode, id }]);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בהוספת הפוסט" });
    }
  };

  /**
   * 📥 Params: { id }
   * 📥 Body: שדות לעדכון (title, body, picture, isFutureInterview וכו')
   * 📤 Response: string message
   */
  updateEpisode = async (req, res) => {
    const { id } = req.params;

    const updatedEpisode = {
      ...req.body,
      picture: req.file ? req.file.filename : req.body.existingPicture || null,
      isFutureInterview: req.body.isFutureInterview === 'true' || req.body.isFutureInterview === true ? 1 : 0,
    };

    const errors = validateEpisode(updatedEpisode, req.user);
    if (errors.length > 0) return res.status(400).json({ errors });

    try {
      const success = await updateEpisodesInDB(id, updatedEpisode);
      if (success) {
        res.status(200).json("הפרק עודכן בהצלחה");
      } else {
        res.status(404).json("פרק לא נמצא");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("שגיאה בעדכון הפרק");
    }
  };

  /**
   * 📥 Params: { id }
   * 📤 Response: string message
   */
  deleteEpisode = async (req, res) => {
    const { id } = req.params;
    const episode = await getEpisodesById(id);

    if (req.adminId !== episode.adminId) {
      return res.status(403).json("אין הרשאה");
    }

    try {
      const success = await deleteEpisodesFromDB(id);
      if (success) {
        res.status(200).json("הפוסט נמחק בהצלחה");
      } else {
        res.status(404).json("פוסט לא נמצא");
      }
    } catch (error) {
      res.status(500).json("שגיאה במחיקת הפוסט");
    }
  };
}

/**
 * 📥 Params: { id }
 * 📤 Response: Array with episode
 */
export const getepisodesByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await getEpisodesById(id);
    res.status(200).json(episode);
  } catch (error) {
    res.status(500).json("שגיאה בשליפת הפוסט");
  }
};
