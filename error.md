####难点

    在安装 bcrypt 的时候一直在报错，安装不上

##使用 post 请求
安装 body-parser

    引入和使用

const bodyParser = require("body-parser");
app.use(
bodyParser.urlencoded({
extended: false
})
);
app.use(bodyParser.json());

## avatar

在使用全国通用头像的时候， 1.安装 npm i gravatar
引入
const gravatar = require("gravatar");
复制 进行修改
const avatar = gravatar.url(req.body.email, {
s: "200",
r: "pg",
d: "mm" //是一个头像
});

如果邮箱在 gravart 官网中注册过，则会显示图片，否则会显示默认图片

##如何在登陆注册之后返回一个 token
安装 npm i jsonwebtoken

##前后端连载

1.安装模块 concurrently
npm i concurrently

在 vue 的 package.json 中输入
"start": "npm run serve"

在后端的 package.json 中输入
"client-install": "npm install --prefix nodevue（vue 的文件名）",
"client": "npm start --prefix nodevue",
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node index.js",
"server": "nodemon index.js",
"dev": "concurrently \"npm run server\"（启动后端） \"npm run client\"（启动前端）"

## http.js 文件是用来放加载动画效果的

    请求拦截和响应拦截

    对token的过期处理

## 解析 token，安装模块 jwt-decode

    在登陆页面使用
