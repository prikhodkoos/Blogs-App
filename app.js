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
    img: {type: String, default: "https://blagoustriy.kiev.ua/templates/kyivblago/images/default_image.jpg"},
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

app.listen(3000, () => {
    console.log("Server has started");
});
