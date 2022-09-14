//jshint esversion:6
//new
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');

const homeStartingContent = "Journal what you love, what you hate, what's in your head, what's important. Journaling organizes your thoughts; allows you to see things in a concrete way that otherwise you might not see. Focus on what you think you need to find in your art.";
const aboutContent = "Hi there! I am Aishi, currently pursuing Computer Science Engineering at Kiit University.Apart from being a engineering student, i am currently writing my very first webtoon and this is my daily journal where i journal about my daily experiences, thoughts, feelings and ideas that will help me to create my first webtoon.";
const contactContent = "I would really like to hear from my readers so get in touch with me through my mail and share your stories, experiences, and thoughts.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://aishi:gargi@cluster0.ckk1goo.mongodb.net/blogDB", {useNewUrlParser: true});
const postSchema = {

  title: String,
 
  content: String
 
 };

 const Post = mongoose.model("Post", postSchema);



 
app.get("/", function(req,res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res){
res.render("contact", {contactContent: contactContent});
});
 

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){
 const post=new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });

});


app.get("/posts/:postId", function(req,res){
  const requestedPostId=req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }); 

});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
