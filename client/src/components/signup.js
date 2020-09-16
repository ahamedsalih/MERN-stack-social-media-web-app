import React,{useState,useEffect} from 'react';
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css"; 


const Signup =()=>{
  const history=useHistory();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState(undefined);

  useEffect(()=>{

    if(url){
      uploadFields();
    }

  },[url])

const uploadPic=()=>{
  
  
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","drtrskt6x")
    fetch("https://api.cloudinary.com/v1_1/drtrskt6x/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    }).then(err=>{
      console.log(err)
    })

  }


const uploadFields=()=>{

  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: 'invalid email',classes:"#e53935 red darken-1"})
    return
  }
  fetch("/signup",
  {
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      password,
      email,
      pic:url
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
    M.toast({html: 'please fill all the fields',classes:"#e53935 red darken-1"})
    }
    else{
      M.toast({html:data.message,classes:"#00c853 green accent-4"})
      history.push("/signin")
    }
  })

}
  const postData=()=>{
    if(image){
      uploadPic();
    }else{
uploadFields()
    }
    
  }

    return(
        <div className="div3">
        <div className="mycard">
         <div className="card" style={{height:"500px"}}>
         <h2 className="hed">Kayalgram</h2>
         <input type="text" placeholder="name"
         value={name} onChange={(e)=>setName(e.target.value)} />
         <input type="text" placeholder="email"

         value={email} onChange={(e)=>setEmail(e.target.value)}
         />
         <input type="password" placeholder="password" 


         value={password} onChange={(e)=>setPassword(e.target.value)}
         />


      <div className="file-field input-field">
      <div className="btn button" id="bttn">
        <span>Upload Pic</span>
        <input type="file" 
          onChange={(e)=>setImage(e.target.files[0])}
        />
        </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
      </div>
         <button className="btn waves-effect  pink waves-light" 
         onClick={()=>postData()}> Signup
    
          </button>
          <div className="div2">
          <Link className="link" to="/signin">already have an account?</Link>
          </div>
        
        </div>
      </div>
      </div>
    
        
    )
}

export default Signup;