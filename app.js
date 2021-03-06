//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// Global variable for the blog posts
var posts = [];

//Setting up ejs as the view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Root route
app.get("/", function (req, res) {
  res.render(__dirname + "/views/home.ejs", { homeStartingContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render(__dirname + "/views/about.ejs", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render(__dirname + "/views/contact.ejs", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render(__dirname + "/views/compose.ejs", { contactContent: contactContent });
});


// Express route with parameters 
app.get("/posts/:myPost", function (req, res) {
 
   
   const requestedTitle =  _.kebabCase(req.params.myPost.toLowerCase());

   // Find the post in the posts array
   // We use kebab case to match the post title in the url 

  const findPost = posts.find(function (post) {
    const storedTitle = _.kebabCase(post.title.toLowerCase());
    return storedTitle === requestedTitle;
});

  if (findPost != undefined) {
    res.render(__dirname + "/views/post.ejs", { post: findPost });
  }else{
    res.render(__dirname + "/views/post.ejs",{post: {title: "404", content: "Page not found"}});
  }

});

//Post route for the compose page to add   a new blog post
//to the posts array and redirect to the home page with the new post added to the posts array 

app.post("/compose", function (req, res) {
  const returnedText = req.body.input_title;
  const input_post = req.body.input_post;
  //console.log("Input text :"+returnedText);
  //console.log("input_post text :"+input_post);
  var post = {
    title: returnedText,
    content: input_post
  }
  posts.push(post);
  res.redirect("/");
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
