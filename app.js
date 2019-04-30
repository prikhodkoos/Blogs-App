const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogs_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const blogSchema = new mongoose.Schema({
    title: String,
    img: String, 
    body: String,
    created: {type: Date, default: Date.now},
});
const Blog = mongoose.model("Blog", blogSchema);

// index route
app.get("/blogs", (req, res) => {
    Blog.find({}, (error, blogs) => {
        if (!error){
            res.render("index", {blogs});
        }
        else {
            console.log(error);
        }
    }); 
});

// new route
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// create route
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, 
    (error, item) => {
        if (!error) {
            console.log(item + " WAS SAVED"); 
            res.redirect("/blogs");
        }
        else {
            console.log(error);
        }
    });
});

// show route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (error, readBlog) => {
        if (!error) {
            res.render("show", {readBlog});
        }
        else {
            console.log(error);
        }
    });
});

app.listen(3000, () => {
    console.log("Server has started");
});
