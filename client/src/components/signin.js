import React,{useState,useContext} from 'react';
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";
import {UserContext} from "../App";


const Signin =()=>{


  const {state,dispatch}=useContext(UserContext);

  const history=useHistory();
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const postData=()=>{ 

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'invalid email',classes:"#e53935 red darken-1"})
      return
    }
    fetch("/signin",
    {
      method:"post",
      headers:{
        "Content-Type":"application/json"
       
        

      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      
      if(data.error){
      M.toast({html: data.error,classes:"#e53935 red darken-1"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:'signedin success',classes:"#00c853 green accent-4"})
        history.push("/");
      }
    })
  }



    return(
        
        <div className="mycard" style={{flexDirection:"column",justifyContent:"center"}}>
         <div className="card" style={{height:"350px"}}>
         
         <h2 className="hed">Kayalgram</h2>
         

         
         <input type="text" placeholder="email"

         value={email} onChange={(e)=>setEmail(e.target.value)}
         />



        <input type="password" placeholder="password" 


         value={password} onChange={(e)=>setPassword(e.target.value)}
         />
         

        <button className="btn waves-effect pink waves-light" 
         onClick={()=>postData()}> Signin
    
          </button>
        

          <div className="div2">
          <Link className="link" to="/signup">don't have an account?</Link>
          </div>
        
        </div>
      </div>
    
        
    )
}

export default Signin;