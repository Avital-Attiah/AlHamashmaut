import {
  getAll,
  addEpisode as addEpisodesToDB,
  updateEpisode as updateEpisodesInDB,
  deleteEpisode as deleteEpisodesFromDB,
  getEpisodesById
} from "../service/episodesData.js";


// פונקציית ולידציה לבדוק תקינות של פוסט
const validateEpisode = (episode, user) => {
  const errors = [];
  if (!episode.title || typeof episode.title !== "string" || episode.title.trim().length < 3) {
    errors.push("יש להזין כותרת תקינה (לפחות 3 תווים)");
  }
  // if (episode.adminId !== user.id) {
  //   errors.push("אין הרשאה");
  // }
console.log(errors);
  return errors;
};


export   class episode {
  // שליפת כל הפוסטים
  getAll = async (req, res) => {
    try {
      console.log('in get all ');

const isFutureInterview = req.query.isFutureInterview=='true' ;
    console.log(typeof isFutureInterview, isFutureInterview);

console.log('isFutureInterview:',isFutureInterview)
      const episodes = await getAll(isFutureInterview);
      console.log(episodes);
      res.status(200).json(episodes);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בשליפת הפוסטים" });
    }
  };

  // הוספת פוסט חדש
  addEpisode = async (req, res) => {
    const episode = req.body;
    const errors = validateEpisode(episode,req.user);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const id = await addEpisodesToDB(episode);
      const newEpisode = { ...episode, id: id };
      res.status(201).json([newEpisode]);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בהוספת הפוסט" });
    }
  };

  // עדכון פוסט קיים לפי ID
  updateEpisode = async (req, res) => {
    // console.log('in update episode req\:',req);
    const { id } = req.params;
    const updatedEpisode = req.body;
    console.log(updatedEpisode);
    const errors = validateEpisode(updatedEpisode,req.user);
console.log('inUpdate');
    if (errors.length > 0) {
      console.log("problem in valid");
      return res.status(400).json({ errors });
    }

    try {
      const success = await updateEpisodesInDB(id, updatedEpisode);
      if (success) {
        res.status(200).json("הפוסט עודכן בהצלחה");
      } else {
        console.log("problem in db")
        res.status(404).json("פוסט לא נמצא");
      }
    } catch (error) {
      res.status(500).json("שגיאה בעדכון הפוסט");
    }
  };

  // מחיקת פוסט לפי ID
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
const getepisodesByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await getEpisodesById(id);
    res.status(200).json([episode]);
  } catch (error) {
    res.status(500).json("שגיאה בשליפת הפוסט");
  }
};

export { getepisodesByIdController };