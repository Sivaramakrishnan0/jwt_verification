
import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


function Log(){
    var [name,setName]=useState('');
    var [pw,setPw]=useState('');
    var a;
    var navigate=useNavigate();
    var Set=(e)=>{
        if(e.target.name==='name'){
            setName(e.target.value);
        }
        else if(e.target.name==='pw'){
            setPw(e.target.value);
        }
    }
    var Get=async()=>{

        
        if(name===''){
            alert("Enter name:");
        }
        else if(pw===''){
            alert("Enter password");
        }
        else{
            var fd=new FormData();
            fd.append("Name",name);
            fd.append("Password",pw);
            
           // const config = { headers: { 'content-type': 'multipart/form-data' }};
            axios.post('http://localhost:2000/student/log',new URLSearchParams(fd))
            .then(function (response) {
                a=typeof(response.data);
                if(a==='string'){
                    alert("Enter correct name and password");
                    console.log(response.data)
                }
                else{
                    alert("Logged in");
                    console.log(response.data);
                    localStorage.setItem("auth",response.data.token);
                    navigate("/test");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
             
        }

    }
    return(
        <>
        <h1>LOG-IN</h1><br/><br/>
        <form>
        <label>Name:</label>
        <input type={"string"} name="name" value={name||''} onChange={Set}/><br/><br/><br/>
        <label>Password:</label>
        <input type={"password"} name="pw" value={pw||''} onChange={Set}/><br/><br/><br/>
        <button onClick={Get} type="button">LOG-IN</button><br/><br/><br/>
        
        </form>
        
        </>
    )
}
export default Log;