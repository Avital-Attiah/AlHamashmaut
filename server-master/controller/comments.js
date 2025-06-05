import {
  addComment,
  deleteComment,
  updateComment,
  getComments,
  getCommentById
} from '../service/commentData.js';

import { getPostByIdController } from '../controller/posts.js';
export class comment {
  
  getAll = async (req, res) => {
    const {post_id}=req.query;
    try {
      let response = await getComments(post_id);
      res.json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  add = async (req, res) => {
    try {
      let newComment = req.body;
      console.log(req.body);
      if (!newComment ||!newComment.name || !newComment.post_id || !newComment.body||!newComment.email||newComment.email!=req.user.email)
         return res.status(401).json('נתוני תגובה חסרים או שגויים');     
      let commentId = await addComment(newComment);
      console.log()
      newComment = { ...newComment, id: commentId };
      console.log(newComment);
      res.status(200).json([newComment]);

    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  update = async (req, res) => {
    try {
      let id = req.params.id;
      const updateComments=req.body
      let response = await updateComment(id, updateComments);
       if (!updateComments ||!updateComments.name || updateComments.post_id || !updateComments.body||!updateComments.email||updateComments.email!=req.user.email)
         return res.status(401).json('נתוני תגובה חסרים או שגויים');   
      console.log('עודכן בהצלחה');
      res.status(200).json('פרטי התגובה עודכנו בהצלחה');
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  delete = async (req, res) => {
    try {
      let commentId = req.params.id;
       const comment = await getCommentControleById(commentId); 

    if (!comment) {
      console.log("problem in getCommentControleById")
      return res.status(404).json( 'התגובה לא נמצאה' );
    }
 const post =await getPostByIdController( comment)
      if(post .user_id!=req.user.id){
        console.log("problem in getPostByIdController");
           return res.status(404).json("אין הרשאה");
      }
      let response = await deleteComment(commentId);
      if (response) {
        console.log('תגובה נמחקה בהצלחה');
        res.status(200).json("התגובה נמחקה בהצלחה");
      } else {
        res.status(404).json("התגובה לא נמצאה");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
  const getCommentControleById = async (id) => {
  try {
    console.log('in get by id all');
    const comment = await   getCommentById(id);
    console.log(pocommentst);
    res.status(200).json([comment]);
  } catch (error) {
    res.status(500).json("שגיאה בשליפת התגובה");
  }
};