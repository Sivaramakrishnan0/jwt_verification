
var student_jwt=require("../model/schema");
var keys=require("../keys");
var bcrypt=require("bcrypt");

var jwt=require("jsonwebtoken");
var ch;
var saltRounds=10;

export const log=async(req,res)=>{
    try{
        console.log(req.body);
        var name=req.body.Name;
        var pw=req.body.Password;
        var test=await student_jwt.findOne({Name:name,Password:pw});
        console.log(test);
        if(test){
            var  token=jwt.sign({
                id:test._id
            },keys.secret,{
                expiresIn:'5m'
            });
            var send={response:'success',token};
           
            console.log(token);
            console.log(send);
            ch=token;
            res.send(send);
          
        }
        else{
            res.send("not found");
            console.log('no');
        }
        
    }
    catch(err){
        console.log('log',err)
    }
}

export const reg=async(req,res)=>{
    try{
        console.log(req.body);
        var details={Name:req.body.Name,Password:req.body.Password,Email:req.body.Email};
        var i_student_jwt=new student_jwt(details);
        console.log(i_student_jwt);
        await bcrypt.hash(req.body.Password,saltRounds,function(err,hash){
            if(err){
                console.log("bcrypt",err);
            }
            else{
                console.log(hash);
                bcrypt.compare(req.body.Password,hash,function(err,res){
                    
                        console.log(res);//true or false

                })
            }
        })
       
        var check= await i_student_jwt.save();
        res.send('hi');
        console.log('hi');

        
    }
    catch(err){
        console.log(err);
    }
}

export const next=(req,res)=>{
    console.log('next');
    console.log(req.headers);
    var token= req.headers['token'];
    console.log(token);
    jwt.verify(token,keys.secret,async(err,payload)=>{
        if(err){
            console.log('false'+err);
            console.log("bye");
            res.send('not user');
        }
        else{
            console.log('true'+JSON.stringify(payload));
            var data = await student_jwt.findById(payload.id).select("-Password");

            console.log(data)
            res.send(data);
        }
    });
    
}