var mongoose=require ("mongoose");
var express=require("express");
var app=express();
var route=require("./routes/routes")

var parser=require("body-parser");
var cors=require("cors");

mongoose.connect('mongodb://localhost:27017/test',(err)=>{
    if(err) console.log("connect failled",err);
    else console.log("connect success");
})

const port=2000;

app.use(cors());
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

app.use('/student',route);

app.get('/v',(req,res)=>{
    res.send('hi');
    console.log('hi')
})

app.listen(port,function(){
    console.log(port+' connected');
})