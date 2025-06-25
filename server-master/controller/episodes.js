

import {
  getAll,
  addEpisode as addEpisodesToDB,
  updateEpisode as updateEpisodesInDB,
  deleteEpisode as deleteEpisodesFromDB,
  getEpisodesById,
  countEpisodes
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
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      const episodes = await getAll(isFutureInterview, limit, offset);
      const total = await countEpisodes(isFutureInterview);

      res.status(200).json({ episodes, total });
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
