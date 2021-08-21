const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

// app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(require("./routes/index"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("Working, port: " + port);
});

// var livereload = require("livereload").createServer({
//     exts: ["css", "js", "ejs"]
// })

// livereload.watch(path.join(__dirname, "views"));
// livereload.watch(path.join(__dirname, "public"));