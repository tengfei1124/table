var express=require("express");
var path=require("path");
var ejs=require("ejs");
var mysql=require("mysql");
var body=require("body-parser");
var app=express();
var connect=mysql.createConnection({
    host :"localhost",
    user :"root",
    password :"",
    database :"biaoge"
})
app.use(body.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"static")));
app.set('views',path.join(__dirname,"template"));
app.set('view engine', 'ejs');
app.get("/",function(req,res){
   connect.query("select * from user",function(error,result){
       // console.log(result)
       res.render("list",{result:result});
   })
})
app.get("/add",function(req,res){
    res.render("add");
})
//添加
app.get("/addinfo",function(req,res){
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age
    connect.query(`insert into user (name,sex,age) values ('${name}',${sex},${age})`,function(error,result){
        // console.log(result)
        if(result.affectedRows>0){
            res.redirect("/add");
        }
    })
})
app.get("/del/(:id)?",function(req,res){
    var id=req.params.id;
    // console.log(id)
    connect.query("delete from user where id="+id,function(error,result){
        if(result.affectedRows>0){
            res.redirect("/");
        }
    })
})
app.get("/edit/(:id)?",function(req,res){
    var id=req.params.id;
    connect.query("select * from user where id="+id,function(error,result){
        // console.log(result);
        res.render("edit",{result:result[0]})
    })

})
app.get("/editinfo",function(req,res){
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    var id=req.query.id;
    console.log(name,sex,age,id)
    connect.query(`update user set name='${name}',sex=${sex},age=${age} where id=${id}`,function(error,result){
        console.log(result)
        if(result.affectedRows==1){
            res.redirect("/");
        }else{
            alert("添加失败");
            res.redirect("/");
        }
    })
})
app.listen(8080);