//登陆  注册
const express = require("express");
const router = express.Router();
//将模板引入
const Profile = require("../../models/Profile");

//验证token的时候，安装的模块
const passport = require("passport");

//获取所有数据
router.get("/text", (req, res) => {
  res.json({
    code: "success",
    data: []
  });
});

//添加数据
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //第一种写法
    // const profileFields = {};
    // if (req.body.type) profileFields.type = req.body.type;
    // if (req.body.describe) profileFields.describe = req.body.describe;
    // if (req.body.income) profileFields.income = req.body.income;
    // if (req.body.expend) profileFields.expend = req.body.expend;
    // if (req.body.cash) profileFields.cash = req.body.cash;
    // if (req.body.remark) profileFields.remark = req.body.remark;

    // new Profile(profileFields).save().then(r => {
    //   res.json({
    //     code: "success",
    //     msg: r
    //   });
    // });

    //第二种写法
    const profileFields = new Profile(req.body);
    profileFields.save().then(r => {
      res.json(r);
    });
  }
);

//获取所有信息
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //第一种方法
    // const result = await Profile.find({});

    // res.json({
    //   code: "success",
    //   msg: result
    // });

    //第二种方法
    Profile.find()
      .then(r => {
        if (!r) {
          return res.status(404).json("没有任何内容");
        } else {
          res.json({
            code: "success",
            msg: r
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

//根据id获取信息
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //第一种方法
    // const result = await Profile.findById(req.params.id);

    // res.json({
    //   code: "success",
    //   msg: result
    // });

    //第二种方法
    Profile.findById(req.params.id)
      .then(r => {
        if (!r) {
          return res.status(404).json("没有任何内容");
        } else {
          res.json({
            code: "success",
            msg: r
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

//编辑信息
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //第一种方法
    try {
      const result = await Profile.findByIdAndUpdate(req.params.id, req.body);
      res.json({
        code: "success",
        msg: result
      });
    } catch (err) {
      res.json({
        code: "error",
        msg: err
      });
    }
    //第二种方法
    // const profileFields = {};
    // if (req.body.type) profileFields.type = req.body.type;
    // if (req.body.describe) profileFields.describe = req.body.describe;
    // if (req.body.income) profileFields.income = req.body.income;
    // if (req.body.expend) profileFields.expend = req.body.expend;
    // if (req.body.cash) profileFields.cash = req.body.cash;
    // if (req.body.remark) profileFields.remark = req.body.remark;

    // Profile.findOneAndUpdate(req.params.id, req.body).then(r => {
    //   res.json({
    //     code: "success",
    //     msg: r
    //   });
    // });
  }
);

//删除信息
router.delete(
  "/del/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const result = await Profile.findByIdAndDelete(req.params.id);
    // res.json({
    //   code: "success",
    //   msg: "删除成功"
    // });

    //第二种方法
    Profile.findByIdAndDelete(req.params.id).then(r => {
      res.json({
        code: "success",
        msg: "删除成功"
      });
    });
  }
);

module.exports = router;
