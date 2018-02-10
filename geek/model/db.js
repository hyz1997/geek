/**
 * Created by 小红依 on 2017/9/28.
 */
var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings.js");
function _connectDB(callback) {
    var url = settings.dburl;
    //连接数据库
    MongoClient.connect(url,function(err,db){
        callback(err,db);
    });
}
//插入数据
exports.insertOne = function(collectionName,json,callback){
    _connectDB(function(err,db){
        if(err){
            callback(err,db);
            db.close();
            return;
        }
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
};
//查找数据
exports.find = function(collectionName,json,C,D){
    var result = [];
    if(arguments.length == 3){
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
    } else if(arguments.length == 4) {
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount*args.page||0;
        var limit = args.pageamount||0;
        var sort = args.sort||{};
    } else {
        throw new Error("find函数的参数个数必须是三个或者四个");
        return;
    }
    _connectDB(function(err,db){
        var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
        cursor.each(function(err,doc){
            if(err) {
                callback(err,null);
                db.close();
                return;
            }
            if(doc!=null){
                result.push(doc);//放入结果数组
            } else {
                //遍历结束
                callback(null,result);
                db.close();
            }
        });
    });
};
exports.deleteMany = function(collectionName,json,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).deleteMany(
            json,
            function(err,results){
                //console.log(results);
                callback(err,results);
                db.close();
            }
        )
    })
};
exports.updataMany = function(collectionName,json1,json2,callback){
    _connectDB(function(err,db){
        //var db = collection(collectionName).find({}).count();
        db.collection(collectionName).updateMany(
            json1,
            json2,
            function(err,results) {
                callback(err,results);
                db.close();
            })
    })
};
exports.getAllCount = function(collectionName,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).count({}).then(function(err,count){
            //test.equal(1,count);
            callback(err,count);
            //console.log(count);
            db.close();
        });


    });
};