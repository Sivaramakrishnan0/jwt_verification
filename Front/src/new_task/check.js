import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Check(){
    
    var [details,setDetails]=useState({});
    var navigate=useNavigate();
    useEffect(()=>{
        
        var temp=localStorage.getItem('auth');
        if(temp===null||temp===undefined){
            navigate("/");
        }
        else{
            var fd=new FormData();
        
            fd.append("auth",temp);
            axios.get('http://localhost:2000/student/test',{headers:{'token':temp}})
            .then(function(response){
                var check=typeof(response.data);
                if(check==='string'){
                    console.log('no');
                    navigate('/');
                }
                if(check==='object'){
                    console.log(response.data);
                    setDetails(response.data);
                }
            })
        }
    },[])
    var logout=()=>{
        localStorage.clear();
        navigate('/');
    }
    return(
        <>
            <h1>TEST</h1><br/><br/>
            <button onClick={logout}>Logout</button><br/><br/><br/>

            <h3>Name:{details.Name}</h3><br/><br/>
            <h3>Email:{details.Email||'Not given'}</h3><br/><br/>
            <h3>id:{details._id}</h3>
        </>
    )

}

export default Check;

