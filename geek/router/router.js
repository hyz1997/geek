/**
 * Created by 小红依 on 2017/10/18.
 */
var md5 = require("../model/md5.js");
var db = require("../model/db.js");
var formidable = require("formidable");
var ObjectID = require('mongodb').ObjectID;
var path = require("path");
var fs = require("fs");
//var multiparty = require('multiparty');


exports.doLogin = function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var userName = fields.userName;
        var password = fields.password;
        //password = md5(md5(fields.password).substr(4,7)+md5(fields.password));
        db.find("users",{"userName":userName},function(err,result){
            if(err) {
                res.send("-3");
                return;
            }
            //对用户这次输入的密码进行相同的加密
            if(result.length==0){
                res.send("-2");
                return;
            }
            var shuPassword = result[0].password;
            if(shuPassword==password) {
                res.send("1");
            } else {
                res.send("-1");
            }
        });
    });
};
exports.findAllItem = function(req,res) {
    var page = parseInt(req.query.page);
    var pageamount = 9;
    var page = parseInt(req.query.page)-1;
    db.find("item",{},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        if(err) {
            console.log("所有项目查找出错"+err);
        }
        db.getAllCount("item",function(count){
            res.json({"result":result,"status":"1","pageSize":pageamount,"page":page+1,"count":Math.ceil(count/pageamount)})
        });
    })
};
exports.findOneItem=function(req,res){
    var itemName = req.query.itemName;
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("item",{"itemName":itemName},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        if(err) {
            console.log("单个项目查找出错"+err);
        }
        db.getAllCount("item",function(count) {
            res.json({
                "result": result,
                "status": "1",
                "pageSize": pageamount,
                "page": page+1,
                "count": Math.ceil(count / pageamount)
            })
        })
    })
};
exports.findItemBydis = function(req,res) {
    var display = req.query.display;
    db.find("item",{"display":display},{"sort":{"shijian":-1}},function(err,result) {
        if(err) {
            console.log("首页项目查找出错"+err);
        }
        res.json({
            "result": result,
            "status": "1"
        });
    })
};
exports.insertItem = function(req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/img/item");
    form.parse(req, function(err, fields, files) {
        var oldpath = files.itemImg.path;
        var newpath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/"+files.itemImg.name;
        var minOldpath = files.minImg.path;
        var minNewpath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/"+files.minImg.name;
        fs.rename(oldpath,newpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("添加图片到文件夹成功");
        });
        fs.rename(minOldpath,minNewpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("添加小图到文件夹成功");
        });
        db.insertOne("item",{
            "itemName":fields.itemName,
            "itemUrl":fields.itemUrl,
            "itemImg":files.itemImg.name,
            "minImg":files.minImg.name,
            "display":fields.display
        },function(err,result){
            if(err) {
                console.log("数据库出错");
                return;
            }
            res.send("1");

        })
    });

};
exports.updataItem = function(req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/img/item");
    form.parse(req, function(err, fields, files) {
        console.log("进入修改");
        db.find("item",{"itemName":fields.itemName},function(err,result){
            console.log("查找");
            if(err) {
                console.log("查询图片失败");
                return;
            }
            var oldPictureName = result[0].itemImg;
            var minoldPictureName = result[0].minImg;
            var picturePath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/" +oldPictureName;
            var minoldPictureName = result[0].minImg;
            var minpicturePath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/" +minoldPictureName;
            fs.unlink(picturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
                console.log("更新删除");
            });
            fs.unlink(minpicturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });

        });
        var oldpath = files.itemImg.path;
        var newpath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/"+files.itemImg.name;
        var minoldpath = files.minImg.path;
        var minnewpath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/"+files.minImg.name;
        fs.rename(oldpath,newpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("跟新添加图片");
        });
        fs.rename(minoldpath,minnewpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("跟新添加小图");
        });
        var savepath = "localhost:5000/img/item/"+files.itemImg.name;
        db.updataMany("item",{"itemName":fields.itemName},{
            $set:{
                "itemImg":files.itemImg.name,
                "minImg":files.minImg.name,
                "itemUrl":fields.itemUrl,
                "display":fields.display
            }
        },function(err,rusult) {
            if(err) {
                console.log("修改项目出错"+err);
                return;
            }
            console.log("修改项目成功");
            res.send("1");
        })
    })
};
exports.deleteItem = function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        db.find("item",{"itemName":fields.itemName},function(err,result){
            if(err) {
                console.log("查询图片失败");
                return;
            }
            var oldPictureName = result[0].itemImg;
            var picturePath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/" +oldPictureName;
            fs.unlink(picturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });
            var minoldPictureName = result[0].minImg;
            var minpicturePath = "C:/Users/asus/Desktop/geek2/geek/public/img/item/" +minoldPictureName;
            fs.unlink(minpicturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });

        });
        db.deleteMany("item",{
            "itemName":fields.itemName
        },function(err,result){
            if(err){
                console.log("删除失败");
                return;
            }
            res.json("1");
        });
        console.log(fields._id);
        console.log("删除成功");
    });

    return;
};
exports.findAllMember = function(req,res) {
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("member",{},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("member",function(count){
            res.json({"result":result,"status":"1","pageSize":pageamount,"page":page+1,"count":Math.ceil(count/pageamount)})
        });
    })
};
exports.findOneMember=function(req,res){
    var memberId = req.query.memberId;
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("member",{"memberId":memberId},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("member",function(count) {
            res.json({
                "result": result,
                "status": "1",
                "pageSize": pageamount,
                "page": page+1,
                "count": Math.ceil(count / pageamount)
            })
        })
    })
};
exports.findMemberByDir=function(req,res){
    var memberDir = req.query.memberDir;
    //var page = parseInt(req.query.page)-1;
    db.find("member",{"memberDir":memberDir},{"sort":{"shijian":-1}},function(err,result){
        db.getAllCount("member",function(count) {
            res.json({
                "result": result,
                "status": "1"
            })
        })
    })
};
exports.findMemberByMain=function(req,res){
    var memberMain = req.query.memberMain;
    db.find("member",{"memberMain":memberMain},{"sort":{"shijian":-1}},function(err,result){
        db.getAllCount("member",function(count) {
            res.json({
                "result": result,
                "status": "1"
            })
        })
    })
};
exports.insertMember = function(req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/img/member");
    form.parse(req, function(err, fields, files) {
        var oldpath = files.memberImg.path;
        var newpath = "E:/前端学习/任务/geek2/geek/public/img/member/"+files.memberImg.name;
        fs.rename(oldpath,newpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }

        });
        db.insertOne("member",{
            "memberId":fields.memberId,
            "memberKind":fields.memberKind,
            "memberDir":fields.memberDir,
            "memberName":fields.memberName,
            "memberGra":fields.memberGra,
            "memberImg":files.memberImg.name,
            "memberIntr":fields.memberIntr,
            "memberMain":fields.memberMain
        },function(err,result){
            if(err) {
                console.log("数据库出错");
                return;
            }
            res.send("1");

        })
    });

};
exports.updataMember = function(req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/img/member");
    form.parse(req, function(err, fields, files) {
        db.find("member",{"memberId":fields.memberId},function(err,result){
            if(err) {
                console.log("查询图片失败");
                return;
            }
            var oldPictureName = result[0].memberImg;
            var picturePath = "E:/前端学习/任务/geek2/geek/public/img/member/" +oldPictureName;
            fs.unlink(picturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });

        });
        var oldpath = files.memberImg.path;
        var newpath = "E:/前端学习/任务/geek2/geek/public/img/member/"+files.memberImg.name;
        fs.rename(oldpath,newpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("添加图片到文件夹成功");
        });
        var savepath = "localhost:5000/img/member/"+files.memberImg.name;
        db.updataMany("member",{"memberId":fields.memberId},{
            $set:{
                "memberKind":fields.memberKind,
                "memberDir":fields.memberDir,
                "memberName":fields.memberName,
                "memberGra":fields.memberGra,
                "memberImg":files.memberImg.name,
                "memberIntr":fields.memberIntr
            }
        },function(err,rusult) {
            if(err) {
                console.log("修改项目出错"+err);
                return;
            }
            res.send("1");
        })
    })
};
exports.deleteMember = function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        db.find("member",{"memberId":fields.memberId},function(err,result){
            if(err) {
                console.log("查询图片失败");
                return;
            }
            var oldPictureName = result[0].memberImg;
            var picturePath = "E:/前端学习/任务/geek2/geek/public/img/member/" +oldPictureName;
            fs.unlink(picturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });

        });
        db.deleteMany("member",{
            "memberId":fields.memberId
        },function(err,result){
            if(err){
                console.log("删除失败");
                return;
            }
            res.json("1");
        });
        console.log(fields._id);
        console.log("删除成功");
    });

    return;
};
exports.findAllGraduation = function(req,res) {
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("graduation",{},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("graduation",function(count){
            res.json({"result":result,"status":"1","pageSize":pageamount,"page":page+1,"count":Math.ceil(count/pageamount)})
        });
    })
};
exports.findOneGraduation=function(req,res){
    var graduationName= req.query.graduationName;
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    console.log(graduationName);
    db.find("graduation",{"graduationName":graduationName},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("graduation",function(count) {
            res.json({
                "result": result,
                "status": "1",
                "pageSize": pageamount,
                "page": page+1,
                "count": Math.ceil(count / pageamount)
            })
        })
    })
};
exports.findGraduationByGra=function(req,res){
    var graduationGra= req.query.graduationGra;
    var pageamount = 7;
    var page = parseInt(req.query.page)-1;
    db.find("graduation",{"graduationGra":graduationGra},{"sort":{"shijian":-1}},function(err,result){
        var count = result.length;
        db.find("graduation",{"graduationGra":graduationGra},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
            console.log(count);
            res.json({
                "result": result,
                "status": "1",
                "pageSize": pageamount,
                "page": page+1,
                "count": Math.ceil(count / pageamount)
            });
        })
    })

};
exports.insertGraduation = function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        db.insertOne("graduation",{
            "graduationGra":fields.graduationGra,
            "graduationName":fields.graduationName,
            "graduationGo":fields.graduationGo,
            "graduationDir":fields.graduationDir
        },function(err,result){
            if(err) {
                console.log("数据库出错");
                return;
            }
            res.send("1");

        })
    });

};
exports.updataGraduation = function(req,res) {
    //var itemName = req.query.itemName;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields.graduationName);
        db.updataMany("graduation",{"graduationName":fields.graduationName},{
            $set:{
                "graduationGra":fields.graduationGra,
                "graduationGo":fields.graduationGo,
                "graduationDir":fields.graduationDir
            }
        },function(err,rusult) {
            if(err) {
                console.log("修改项目出错"+err);
                return;
            }
            res.send("1");
        })
    })
};
exports.deleteGraduation = function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields.graduationName);
        db.deleteMany("graduation",{
            "graduationName":fields.graduationName
        },function(err,result){
            if(err){
                console.log("删除失败");
                return;
            }
            res.json("1");
        });
        console.log("删除成功");
    });

    return;
};
exports.findAllStudy = function(req,res) {
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("study",{},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("graduation",function(count){
            res.json({"result":result,"status":"1","pageSize":pageamount,"page":page+1,"count":Math.ceil(count/pageamount)})
        });
    })
};
exports.findStudyByKind=function(req,res){
    var studyKind = req.query.studyKind;
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("study",{"studyKind":studyKind},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("study",function(count) {
            res.json({
                "result": result,
                "status": "1",
                "pageSize": pageamount,
                "page": page+1,
                "count": Math.ceil(count / pageamount)
            })
        })
    })
};
exports.insertStudy = function(req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/img/study");
    form.parse(req, function(err, fields, files) {

        var oldpath = files.studyImg.path;
        var newpath = "C:/Users/asus/Desktop/geek2/geek/public/img/study/"+files.studyImg.name;
        fs.rename(oldpath,newpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("添加图片到文件夹成功");
        });
        var savepath = "localhost:5000/img/study/"+files.studyImg.name;
        db.insertOne("study",{
            "studyKind":fields.studyKind,
            "studyName":fields.studyName,
            "studyUrl":fields.studyUrl,
            "studyImg":files.studyImg.name,
            "studyIntr":fields.studyIntr
        },function(err,result){
            if(err) {
                console.log("数据库出错");
                return;
            }
            res.send("1");

        })
    });

};
exports.updataStudy = function(req,res) {
    var _id = req.query._id;
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/img/study");
    form.parse(req, function(err, fields, files) {
        db.find("study",{"_id":ObjectID(fields._id)},function(err,result){
            if(err) {
                console.log("查询图片失败");
                return;
            }
            var oldPictureName = result[0].studyImg;
            var picturePath = "C:/Users/asus/Desktop/geek2/geek/public/img/study/" +oldPictureName;
            fs.unlink(picturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });

        });
        var oldpath = files.studyImg.path;
        var newpath = "C:/Users/asus/Desktop/geek2/geek/public/img/study/"+files.studyImg.name;
        fs.rename(oldpath,newpath,function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("添加图片到文件夹成功");
        })
        var savepath = "localhost:5000/img/study/"+files.studyImg.name;
        db.updataMany("study",{"_id":ObjectID(fields._id)},{
            $set:{
                "studyKind":fields.studyKind,
                "studyName":fields.studyName,
                "studyUrl":fields.studyUrl,
                "studyImg":files.studyImg.name,
                "studyIntr":fields.studyIntr
            }
        },function(err,rusult) {
            if(err) {
                console.log("修改项目出错"+err);
                return;
            }
            res.send("1");
        })
    })
};
exports.deleteStudy = function(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        db.find("study",{"_id":ObjectID(fields._id)},function(err,result){
            if(err) {
                console.log("查询图片失败");
                return;
            }
            var oldPictureName = result[0].studyImg;
            var picturePath = "C:/Users/asus/Desktop/geek2/geek/public/img/study/" +oldPictureName;
            fs.unlink(picturePath,function(err) {
                if(err) {
                    console.log("删除文件出错"+err);
                }
            });

        });
        db.deleteMany("study",{
            "_id":ObjectID(fields._id)
        },function(err,result){
            if(err){
                console.log("删除失败");
                return;
            }
            res.json("1");
        });
        console.log(fields._id);
        console.log("删除成功");
    });

    return;
};
exports.findAllSug = function(req,res) {
    var pageamount = 5;
    var page = parseInt(req.query.page)-1;
    db.find("sug",{},{"sort":{"shijian":-1},"pageamount":pageamount,"page":page},function(err,result){
        db.getAllCount("sug",function(count){
            res.json({"result":result,"status":"1","pageSize":pageamount,"page":page+1,"count":Math.ceil(count/pageamount)})
        });
    })
};
exports.insertSug = function(req,res) {
    var form = new formidable.IncomingForm();
    //form.uploadDir = path.normalize(__dirname + "/../banner");
    form.parse(req, function(err, fields, files) {
        //var oldpath = files.itemName.path;
        //var newpath = "C:/Users/asus/Desktop/geek2/geek/public/img/item"+files.picture.name;
        db.insertOne("sug",{
            "sugName":fields.sugName,
            "sugContent":fields.sugContent,
            "sugAdress":fields.sugAdress,
            "sugPhone":fields.sugPhone
        },function(err,result){
            if(err) {
                console.log("数据库出错");
                return;
            }
            res.send("1");

        })
    });
};
