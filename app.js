const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/blogs_app", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

// edit route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (error, editBlog) => {
        if (!error) {
            res.render("edit", {editBlog});
        }
        else {
            console.log(error);
        }
    });
});

// update route
app.put("/blogs/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(!err){
            res.redirect("/blogs/"+req.params.id);
        }
        else {
            console.log(err);
        }
    });
});

app.listen(3000, () => {
    console.log("Server has started");
});
