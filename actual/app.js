
    const express = require("express")
    const mongoose = require("mongoose")
    const path = require("path")
    const session = require("express-session");
    const sessionMgdb = require("connect-mongo")(session);
    let app = express();
        app.listen(8787);

        app.use(express.json());//接收post请求
        app.use(express.urlencoded({extended:true}));//接收post请求
        app.use(express.static(path.join(__dirname + "/public"))); //静态资源库
        app.set("view engine","ejs");// 规定使用ejs模板
        app.set("views", path.join(__dirname + "/view")); //ejs 模板路径

        //记录登录成功的状态
        app.use(session({
            secret: "qwwwq",//密钥
            saveUninitialized: false, //是否有初始值
            resave:false,// 是否每次请求都重新保存数据
            cookie:{maxAge:1000*60*60},//cookie保存时间,
            rolling:true,//是否每次操作页面都跌增cookie保存时间
            store:new sessionMgdb({//将登录成功记录的数据保存到数据库中 空间更大 更直观
                url: "mongodb://localhost/a"
            })
        }));


        //连接数据库
        mongoose.connect("mongodb://localhost/a",{useNewUrlParser:true});

        //网页icon
        app.get("/favicon.ico",(req,res)=>{
            res.sendFile(path.join(__dirname + "/public/favicon.ico"));
        })

        //首页路由
        app.use("/",require("./router/index.js"));

        //后台路由
        app.use("/admin",require("./router/admin"));

        //任务管理路由
        app.use("/api",require("./router/api"));












