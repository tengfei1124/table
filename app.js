var express=require("express");
var path=require("path");
var ejs=require("ejs");
var mysql=require("mysql");
var body = require('body-parser')
var app=express();
app.listen(8888);
/*
* 1.引入  express
* 2.设置路径   get   post
* 3.引入  ejs   解析动态模板
* 
* 
* 
* 
* */
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'biaoge'
});
// connection.connect();
// var result=connection.query('SELECT * FROM hu');
// // console.log(result)
// connection.end();
app.use(body.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,"static")));
app.set('views',path.join(__dirname,"template"));
app.set('view engine', 'ejs');
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"/1.html"))
})
app.get('/list/:id', function (req, res) {
    res.render('list',{id:req.params.id});
    res.render('list',{id:req.query.name})
});
app.post('/list/(:id)?',function(req,res){
    res.render('list',{id:req.body.name});
})