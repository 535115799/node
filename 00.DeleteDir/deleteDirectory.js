
const fs = require("fs");
const PATH = require("path");

//删除复杂内容文件夹封装
function del(path,callback){
    (function stat(path){
        new Promise((resolve, reject) =>{
            fs.stat(path,(err,stats)=>{
                if(err) reject(err);
                resolve(stats);
            })
        }).then((stats)=>{
            if(stats.isFile()){
                fs.unlinkSync(path);
            }else if(stats.isDirectory()){
                return new Promise((resolve, reject) => {
                    fs.rmdir(path,(err)=>{
                        if(err){
                            resolve(path);
                        }
                    })
                })
            }
        }).then((path)=>{
            if(!path) return;
            fs.readdir(path,(err,data)=>{
                data.forEach((p)=>{
                    stat(PATH.join(path,p));
                })
                stat(path);
            })
        }).catch((err)=>{
            callback(err);
        })
    })(path);
}

module.exports.del = del;


/* eS5
    !function stat(path){
        fs.stat(path,(err,stats)=>{
            if(err) callback(err);
            if(stats.isFile()){
                fs.unlinkSync(path)
            }else if(stats.isDirectory()){
                fs.rmdir(path,(err)=>{
                    if(err){
                        fs.readdir(path,(err,date)=>{
                            date.forEach((d)=>{
                                stat(PATH.join(path,d));
                            });
                            stat(path);
                        })
                    }
                })
            }
        })
    }(path);
 */









