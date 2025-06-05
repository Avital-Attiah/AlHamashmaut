import {
  getAll,
  addPost as addPostToDB,
  updatePost as updatePostInDB,
  deletePost as deletePostFromDB,
  getPostById
} from "../service/postData.js";

// פונקציית ולידציה לבדוק תקינות של פוסט
const validatePost = (post, user) => {
  const errors = [];
  if (!post.title || typeof post.title !== "string" || post.title.trim().length < 3) {
    errors.push("יש להזין כותרת תקינה (לפחות 3 תווים)");
  }
  if (post.user_id !== user.id) {
    errors.push("אין הרשאה");
  }
console.log(errors);
  return errors;
};


export   class post {
  // שליפת כל הפוסטים
  getAll = async (req, res) => {
    try {
      console.log('in get all');

      const posts = await getAll();
      console.log(posts);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בשליפת הפוסטים" });
    }
  };

  // הוספת פוסט חדש
  addPost = async (req, res) => {
    const post = req.body;
    const errors = validatePost(post,req.user);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const id = await addPostToDB(post);
      const newPost = { ...post, id: id };
      res.status(201).json([newPost]);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בהוספת הפוסט" });
    }
  };

  // עדכון פוסט קיים לפי ID
  updatePost = async (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    const errors = validatePost(updatedPost,req.user);
console.log('inUpdate');
    if (errors.length > 0) {
      console.log("problem in valid");
      return res.status(400).json({ errors });
    }

    try {
      const success = await updatePostInDB(id, updatedPost);
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
  deletePost = async (req, res) => {
    const { id } = req.params;
  const post = await getPostById(id);
if (req.user.id !== post.user_id) {
  return res.status(403).json("אין הרשאה");
}
    try {
      const success = await deletePostFromDB(id);
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
const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    res.status(200).json([post]);
  } catch (error) {
    res.status(500).json("שגיאה בשליפת הפוסט");
  }
};

export { getPostByIdController };