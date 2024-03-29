const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router.get("/", (req, res) => {
 
  res.json({ comments });
});


router.post("/", (req, res, next) => {

  const { userId, postId, body } = req.body;

 
  if (!userId || !postId || !body) {
    return next(error(400, "Insufficient Data"));
  }


  const comment = {
    id: comments.length + 1,
    userId,
    postId,
    body,
  };

 
  comments.push(comment);

  res.status(201).json(comment);
});


router.patch("/:id", (req, res) => {

  const commentId = req.params.id;

 
  const commentIndex = comments.findIndex((comment) => comment.id === parseInt(commentId));

  if (commentIndex === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

 
  comments[commentIndex].body = req.body.body;

  res.json({ updatedComment: comments[commentIndex] });
});


module.exports = router;