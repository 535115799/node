        const mongodb = require("mongoose");

        mongodb.connect("mongodb://localhost:27017/goudan",{useNewUrlParser:true})

        mongodb.connection.once("error" , function () {
            console.log("连接成功0");
        })

        mongodb.connection.once("open",function () {
            console.log("连接成功1");
        })

        const userSchema = new mongodb.Schema({
            userName :{type:String,required:true,default:"goudan",},
            password :{type:String,required:true,},
            info:{
                phone:{type:Number},
                qq:{type:Number}
            }
        });

        const articleSchema = new mongodb.Schema({
           title:{type:String},
           author:{ref:"user",type:mongodb.Schema.Types.ObjectId}
        });

        const user = mongodb.model("user",userSchema);
        const article = mongodb.model("article",articleSchema);


              // user.create({
              //     userName: "HAHA",
              //     password: "as348988",
              //     info:{
              //         phone: 123456789,
              //         qq:535115799
              //     }
              // })
                // user.find((err,date)=>{
                //     console.log(date);
                //     article.create({
                //         title:"关联表",
                //         author: date[0]._id,
                //     })
                // })

            article.find().populate("author").exec((err,data)=>{
                console.log(data);
            })














