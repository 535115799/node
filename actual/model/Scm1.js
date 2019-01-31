
        const mongoose = require("mongoose");

        //用户婊
        const userSchema = new mongoose.Schema({
            username:{type: String,required:true},
            password:{type: String,required:true},
            used:{type:Boolean,required:true,default:false},
            level:{type:Number,required:true,default:1},
            task:{
                publish:{type:[{type:mongoose.Schema.Types.ObjectId,ref:"task"}]},//发布

                receive:{type:[{type:mongoose.Schema.Types.ObjectId,ref:"task"}]},//接取

                accomplish:{type:[{type:mongoose.Schema.Types.ObjectId,ref:"task"}]},//完成
            }
        });

        //任务婊
        const taskSchema = new mongoose.Schema({
            title:{type:String}, //标题
            content:{type:String}, //内容
            author:{type: mongoose.Schema.Types.ObjectId,ref:"user"},//发布人
            receiver:{type:[{//接取人 完成情况
                    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
                    msg:{type:String},//完成的/评论的数据
                    findmsg:{type:Boolean,default:false}//是否 评论/提交 只能一次
                }]},
            time:{type:String,default:new Date()},// 发布时间
            num:{type:Number},//接取人数
            reward:{type:String},//奖励
            diffculty:{type:String},//难度
            expiation:{type:String},//截止日期
            can:{type:Boolean,required:true,default:false}//是否已完成 默认未完成

        })

        const user = mongoose.model("user",userSchema);
        const task = mongoose.model("task",taskSchema);

        //导出
        module.exports = {
            user,
            task
        }













