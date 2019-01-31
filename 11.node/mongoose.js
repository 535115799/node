    const mongoose = require("mongoose");

        mongoose.connect("mongodb://localhost:27017/dacui",{useNewUrlParser:true})

        mongoose.connection.once("open",()=>{
            console.log("连接成功");
        });

        mongoose.connection.once("error",()=>{
            console.log("连接失败");
        });

        let userScchema = new mongoose.Schema({
            name:{type:String,required:true,dafault:"xx"},
            psw:{type: Number,required:true},
            info:{
                geyan:{type:String},
                qq:{type:Number}
            },
            a:{type:[{b:{type:Number},c:{type:Number}}]}
        });

        let articSchema = new mongoose.Schema({
            title:{type:String},
            author:{ref:"xxx",type: mongoose.Schema.Types.ObjectId},
            pinglue:[{type:String}]
        })

        let pipo = mongoose.model("xxx",userScchema);
        let article = mongoose.model("ooo",articSchema);


        /*article.create({
            title:"关联表",
            author:"5c322e02248a919e747590ec",
            pinglue:"99999"
        })*/

            /* 增加
            pipo.create({
                name:"数组测试2",
                psw:11111,
                info:{
                    geyan:"帅气",
                    qq:222222
                },
                a:{b:55555}
            },(err,data)=>{
                console.log(err);
                console.log(data);
            })*/


            /*删除
            pipo.deleteMany({psw:{$ne:0}},(err,data)=>{
                console.log(err);
                console.log(data);
            })*/



            /* 修改/添加、相当于重新赋值
            pipo.updateOne({psw:3333333},{$set:{psw:1234}},(err,data)=>{
                console.log(err);
                console.log(data);
            })*/


            /* 查找
            pipo.find({_id:"5c322e11878238b3c4698ea7"},(err,data)=>{
                console.log(err);
                console.log(data);
            })
            * */

            /*/*数组格式增加修改 push pull set
            pipo.updateOne({name:"数组测试"},{$set:{a:{b:4444}}},(err,data)=>{
                console.log(err);
                console.log(data);
            })*/


            /*或者
            pipo.find({$nor:[{name:"大哥"},{name:"老板"}]},(err,data)=>{
                console.log(err);
                console.log(data);
            })*/

            /* 某个属性包含哪些值
            pipo.find({name:{$nin:["老板","大哥"]}},(err,data)=>{
                console.log(data);
            })*/


           /* 统计数据个数
             pipo.estimatedDocumentCount((err,data)=>{
                console.log(err);
                console.log(data);
            })*/

            /*pipo.countDocuments({name:"大哥"},(err,data)=>{
                console.log(data);  通过条件查找
            })*/


            /*  排序  -1 大到小/倒叙  1 小到大/正序
                pipo.find().sort({_id:-1}).exec((err,data)=>{
                console.log(data);
            })*/

            /*从第几开始找几个
            pipo.find().skip(0).limit(4).exec((err,data)=>{
                console.log(data);
            })*/

            //表关联查询
            /*article.find().populate({
                path:"author"
                sort:{_id:-1},
                skip:"Number",
                populate:{}
            }).exec((err,data)=>{
                console.log(err);
                console.log(data);
            })*/

           /* article.find((err,data)=>{
                pipo.find(data[0].author,(err,data)=>{
                    console.log(err);
                    console.log(data);
                })
            })*/


            //筛选属性查询
            pipo.findOne({name:"老板"}).select("name psw").exec((err,data)=>{
                console.log(err);
                console.log(data);
            })












