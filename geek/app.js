/**
 * Created by 小红依 on 2017/10/18.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js");



app.set("view engine","ejs");
app.use(express.static("./public"));
app.use("/banner",express.static("./banner"));

app.post("/dologin",router.doLogin);
app.get("/findAllItem",router.findAllItem);
app.get("/findOneItem",router.findOneItem);
app.get("/findItemBydis",router.findItemBydis);
app.post("/insertItem",router.insertItem);
app.post("/deleteItem",router.deleteItem);
app.post("/updataItem",router.updataItem);
app.get("/findAllMember",router.findAllMember);
app.get("/findOneMember",router.findOneMember);
app.get("/findMemberByDir",router.findMemberByDir);
app.get("/findMemberByMain",router.findMemberByMain);
app.post("/insertMember",router.insertMember);
app.post("/deleteMember",router.deleteMember);
app.post("/updataMember",router.updataMember);
app.get("/findAllGraduation",router.findAllGraduation);
app.get("/findOneGraduation",router.findOneGraduation);
app.get("/findGraduationByGra",router.findGraduationByGra);
app.post("/insertGraduation",router.insertGraduation);
app.post("/deleteGraduation",router.deleteGraduation);
app.post("/updataGraduation",router.updataGraduation);
app.get("/findAllStudy",router.findAllStudy);
app.get("/findStudyByKind",router.findStudyByKind);
app.post("/insertStudy",router.insertStudy);
app.post("/deleteStudy",router.deleteStudy);
app.post("/updataStudy",router.updataStudy);
app.post("/insertSug",router.insertSug);
app.get("/findAllSug",router.findAllSug);

app.listen(80);