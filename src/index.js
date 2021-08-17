const express = require("express");
const app = express();
const path = require("path");

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(require("./routes/index"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
    console.log("Funcionando!");
});

var livereload = require("livereload").createServer({
    exts: ["css", "js", "ejs"]
})

livereload.watch(path.join(__dirname, "views"));
livereload.watch(path.join(__dirname, "public"));