const express = require("express");
//1.引入mongoose
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const passport = require("passport");
const user = require("./routers/api/user");
const profile = require("./routers/api/profile");

//app.use(express.use());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//2.直接连接
//mongoose.connect("mongodb://localhost:27017/proAll");

//在别的文件写，在这引入
const db = require("./config/db").mongooseURL;
//连接
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("连接"))
  .catch(err => console.log("连接错误" + err));

//passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

//使用router
app.use("/api/user", user);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("服务器运行于5000");
});
