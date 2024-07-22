import express from "express";
import bodyParser from "body-parser";
import {v4 as uuidv4} from "uuid";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts=[];

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/blog",(req,res)=>{
    res.render("blog.ejs");
});

app.get("/home",(req,res)=>{
    res.render("home.ejs",{posts:posts});
});

app.post("/blog",(req,res)=>{
    const newPost={
        id:uuidv4(), //gives each post a unique id
        title:req.body.title,
        content:req.body.main
    };
    posts.push(newPost);
    res.redirect("/home");
});

app.get("/news",(req,res)=>{
    res.render("news.ejs");
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});

app.delete("/post/:id", (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.sendStatus(200);
});

app.put("/post/:id", (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
        id: postId,
        title: req.body.title,
        content: req.body.main
    };

    // Find the index of the post to be updated
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        // Update the post
        posts[postIndex] = updatedPost;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});