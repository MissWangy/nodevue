//登陆  注册
const express = require("express");
const router = express.Router();
//将模板引入
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const gravatar = require("gravatar");
//返回一个token值的时候安装的模块
const jwt = require("jsonwebtoken");
const keys = require("../../config/db");

//验证token的时候，安装的模块
const passport = require("passport");

//获取所有数据
router.get("/text", (req, res) => {
  res.json({
    code: "success",
    data: []
  });
});

//添加数据   安装body-parser
router.post("/register", (req, res) => {
  //查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json("邮箱已被注册!");
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identify: req.body.identify
      });

      //对密码加密   安装模块bcrypt
      // bcrypt.genSalt(10, function(err, salt) {
      //   bcrypt.hash(newUser.password, salt, (err, hash) => {
      //     //先判断是否有问题
      //     //if (err) throw err;
      //     newUser.password = hash;

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));

      // newUser.save()
      //   .then(r => {
      //     res.json({
      //       code: "success",
      //       msg: res.json(r)
      //     });
      //   })
      //   .catch(err => {
      //     res.json({
      //       code: "err",
      //       msg: err
      //     });
      //   });
      //});
      //});
    }
  });
});

//用户登录成功之后，返回一个token
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(res);

  //查询数据库
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json("用户不存在!");
    }

    //密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identify: user.identify
        };
        //jwt.sign("规则","加密名字","过期时间","箭头函数")
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json("密码错误!");
      }
    });
  });
});

//拿到token之后，返回用户信息
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identify: req.user.identify
    });
  }
);

module.exports = router;
