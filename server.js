const express = require("express");
const app = express();
const port = 5000;


app.use(express.static("./styles"));


const fs = require('fs');

app.engine("bleks", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

  

        const rendered = content
        .toString()
        .replaceAll("#title#", `${options.title}`)
        .replace("#content#", `${options.content}`);
        return callback(null, rendered);
    });
});

app.set("views", "./views");

app.set("view engine", "bleks");

app.get("/", (req, res) => {
    const options = {
        title: "Product Catalogs",
        content: "Lorem ipsum app.engine() dolor sit amet fs module consectetur adipisicing elit. Dolor dolorum accusamus vel mollitia doloribus dicta, ad autem at a, neque ipsa amet? Aliquid corporis libero id ipsa animi minima ratione?"
    };

    res.render("index", options);
});


app.get("/form", (req, res) => {
    const options = {
        title: "Product Catalog Information",
        content: "Enter product ID",

    };
    res.render("formView", options);
});



const posts = require ("./routes/posts");
const comments = require("./routes/comments")
const users = require("./routes/users");




app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})


app.get("/", (err, req, res, next)=> {
    res.status(500).send('Something broke!')
})


app.get("/", (req, res) => {
    res.send("PRODUCT CATALOG");
});


app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
})