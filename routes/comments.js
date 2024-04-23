const express = require('express')
const router = express.Router()

const comments = require('../data/comments')



router.get("/", (req, res)=> {
    res.json(comments);
})



router.post("/", (req, res) => {
    if (req.body.comments.customerName && req.body.comments.review) {
      
        const comment = {
            id: comments[comments.length - 1].id + 1,
            comments: req.body.comments.customerName,
            comments: req.body.comments.review
        }; 

        comments.push(comment);
        res.json(comments[comments.length - 1])
    } else res.json({error: "Insufficient Data"});
});



router.get("/:id", (req, res, next)=> {
    const comment = comments.find((c) => c.id == req.params.id);

    console.log(comment);
   
      if (comment) res.json(comment);
      else next()
});




router.patch("/:id", (req, res, next)=> {
    const comment = comments.find((c, i)=> {
        if(c.id == req.params.id) {
            for(const key in req.body) {
                comments[i][key] = req.body[key];
            }
            return true
        }
    });
    
    if (comment) res.json(comment);
    else next();
});



router.delete("/:id", (req, res, next) => {
    const comment = comments.find((c, i) => {
        if (c.id == req.params.id) {
            comments.splice(i, 1);
            return true
        }
    });
    if (comment) res.json(comment)
    else next();
});






module.exports = router