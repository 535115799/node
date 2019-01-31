    const express = require("express");
    const crypto = require("crypto");
    const Router = express.Router();
    const {user,task} = require("../model/Scm1");

        //注册
        Router.get("/reg",(req,res)=>{
            res.render("reg",{
                title:"注册"
            });
        }).post("/reg",(req,res)=>{
            //console.log(req.body);
            user.findOne({username:req.body.username}).then((data)=>{
                if(data){
                    return res.send({code:0,msg:"用户名已存在"});
                }else{

                    //规定是Hash转码方式
                    const hash = crypto.createHash('sha256');
                    //加密
                    const password = hash.update(req.body.password).digest('hex');

                    user.create({
                        username: req.body.username,
                        password: password
                    }).then((data)=>{
                        res.send({code:1,msg: "注册成功"});
                    }).catch((err)=>{
                        console.log(err);
                    })

                }
            }).catch((err)=>{
                console.log(err);
            })
        })

        //登录
        Router.get("/login",(req,res)=>{
            res.render("login",{
                title:"登录"
            })
        }).post("/login",(req,res)=>{
            user.findOne({username:req.body.username},(err,data)=>{
                if(data){
                    const lgi = crypto.createHash("sha256");
                    const password = lgi.update(req.body.password).digest("hex");
                    if(data.password === password){
                        req.session.logins = true; //登录成功
                        req.session.user = data; //储存用户信息
                        res.send({code:0,msg:"登录成功"})
                    }else{
                        res.send({code:1,msg:"密码错误"})
                    }


                }else{
                    res.send({msg:"用户不存在"});
                }
            })
        })

        //首页路由
        Router.get("/",(req,res)=>{
            res.render("index",{
                logins: req.session.logins,//真 假
                user:req.session.user,// 用户信息 需要展示在首页
                title:"首页"
            });
        })

        //退出登录路由
        Router.get("/out",(req,res)=>{
            req.session.destroy(); // 清除登录成功状态与数据
            res.redirect("/"); //跳转首页
        })

        //渲染任务详情页面
        Router.get('/xq/:id',(req,res)=>{
            task.findOne({_id:req.params.id}).populate('author receiver.user').exec((err,data)=>{
                //在数组中查找是否有指定值   如果存在返回值是找到那个值的下标  不存在是 -1
                let ing = data.receiver.findIndex((val)=>{
                    return String(val.user._id) === (req.session.user && req.session.user._id);
                })
                res.render('xq',{
                    title:"详情页 -- " + data.title,
                    logins:req.session.logins,
                    user:req.session.user,
                    data:data,
                    ing:ing
                })
            })
        })

        //任务接取
        Router.post("/xq/:id",(req,res)=>{
            if( !req.session.logins ){
                return res.send({code:1,data:"请先登录"})
            }
            task.findOne({_id:req.params.id},(err,data)=>{
                if(String(data.author) === String(req.session.user._id)){
                   return res.send({code:2,data:"您不能接取自己发布的任务！"});
                }
                //任务表 接取的用户
                task.updateOne({_id:req.params.id},{$push:{receiver:{user:req.session.user._id}}},()=>{
                    res.send({code:0,data:"接取成功"});
                });
                //用户表 添加接取的任务
                user.updateOne({_id:req.session.user._id},{$push:{'task.receive':req.params.id}},()=>{
                })
            })


        })

        module.exports = Router;














