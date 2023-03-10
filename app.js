//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent ="Blogging is a fun and flexible way for self-expression and social connection, so it is no wonder blogs have become very popular. In addition, people can start blogging to improve their writing skills or even promote their businesses.So,what are you waiting for? Click the compose button and start writing your own blog.";
const aboutContent="Our Blogging website is used to write your own blogs and showcase it to everyone.You can create a blog to inspire, to educate, or to connect with others. But blogging is not just for your readers. It’s also for yourself. There’s a lot of gratification that comes with expressing yourself in new, digital forms. Finally, when you start growing your readership, blogging can become a sustainable stream of revenue. There are plenty of creative ways to monetize your blog as it grows, from affiliate links to banner advertising and sponsored posts.Someone of the blogs you can make are";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGOOSE_LINK);

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      postslist: posts
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


let port=process.env.PORT;
if(port== null || port==""){
  port="3000";
}

app.listen(port, function() {
  console.log("Server started succesfully");
});
