var mongoose=require("mongoose");
var schema=mongoose.Schema;

var stud=new schema({
    Name:String,
    Password:String,
    Email:String
});

var student_jwt=mongoose.model("student_jwt",stud);

module.exports=student_jwt;