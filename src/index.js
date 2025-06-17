const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT;
const gets = require("./routes/get");
const post = require("./routes/post");
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.method)
    next();
});

app.use(cors());
app.use(gets);
app.use(post);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));