//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "No ones perfect isn't it ? Even I am an amateur . So for all the amateurs like me here comes a blog site. You can write  down  your blogs or your activites , the events that happens in your life and the cool thing is that even your name dosen't gets appeared. So what are you waiting for ?Go ahead open contact us page and message me to GET STARTED ! ";
const aboutContent ="Just keep it Simple. I would like to cut this short I am a Mechanical Enginner and still learning web development studying at Bangalore . I wanted to design a Blog site for basically us the twenties ones and here I am with it . I am constatnly working on this site and if you got any new suggestions feel free to share @ contact page ";
const contactContent = "Want to create your own blog site? Or feel like writing a blog. Contact me below at ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-Ashu:ashu2000@cluster0.s7xlu.gcp.mongodb.net/blogDB", {useNewUrlParser: true});



const postSchema = {
  title: String,
  content: String,
  from: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      // from:postName
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
    // :req.body.postName
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started succesfully");
});
