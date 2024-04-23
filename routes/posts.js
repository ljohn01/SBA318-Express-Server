const express = require('express')
const router = express.Router()

const posts = require('../data/posts');



router.get("/", (req, res)=> {
    res.json(posts);
});



router.post("/", (req, res) => {
    if (req.body.manufacturer && req.body.color && req.body.antivirus) {
      
        const post = {
            id: posts[posts.length - 1].id + 1,
            manufacturer: req.body.manufacturer,
            color: req.body.color,
            antivirus: req.body.antivirus,
        };
        posts.push(post);
        res.json(posts[posts.length - 1])
    } else res.json({error: "Insufficient Data"});
});


router.get("/:id", (req, res, next)=> {
    const post = posts.find((po) => po.id == req.params.id);

    console.log(post);
  
      if (post) res.json(post);
      else next()
});

router.patch("/:id", (req, res, next) => {
    const post = posts.find((po, i)=> {
        if(po.id == req.params.id) {
            for (const key in req.body) {
                posts[i][key] = req.body[key];
            }
            return true
        }
    });

    if (post) res.json(post);
    else next();
});


router.delete("/:id", (req, res, next) => {
    const post = posts.find((po, i) => {
        if (po.id == req.params.id) {
            posts.splice(i, 1);
            return true
        }
    });
    if (post) res.json(post)
    else next();
});


router.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource not found" });
  });
  


module.exports = router