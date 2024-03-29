const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");


router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    console.log("get method post")
    res.json({ posts, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });


module.exports = router;