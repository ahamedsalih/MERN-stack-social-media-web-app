import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from "../App";


const Profile =()=>{

    const {state,dispatch}=useContext(UserContext);

    const [mypics,setMypics]=useState([]);
    const [image,setImage]=useState("");
    


    useEffect(()=>{
     fetch("/mypost",{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
         setMypics(result.mypost);
     })
    },[])

   useEffect(()=>{
      if(image){
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
          
        
         // 
         //
          fetch("/updatepic",{
              method:"put",
              headers:{
                  "Content-Type":"Application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  pic:data.url
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
              dispatch({type:"UPDATEPIC",payload:result.pic})
            
          })
        }).then(err=>{
          console.log(err)
        })
      }
   },[image])
    const updatePic=(file)=>{
        setImage(file);
  
     
    
      }
    

    return(
        
        <div className="profile" style={{marginTop:"30px",maxWidth:"550px",margin:"0px auto"}}>
        <div className="profilediv" style={{marginTop:"30px",height:230}}>

        <img style={{height:"160px",width:"160px",borderRadius:"80px",marginBottom:"10px"}}
         src={state?state.pic:""}/>
         
         <div style={{marginLeft:"30px",marginTop:"-30px"}}>
         <h3>{state?state.name:"loading"}</h3>
         <h5>{state?state.email:"loading"}</h5>
         
         <div style={{display:"flex",justifyContent:"space-between",width:"104%",margin:10}}>
             <h5>{mypics.length} posts</h5>
             <h5>{state?state.followers.length:"0"} followers</h5>
             <h5>{state?state.following.length:"0"} following</h5>

             </div>
             
         </div>

         <div style={{position:"absolute",marginTop:150,marginLeft:19}}>
         <div className="file-field input-field">
      <div  className="btn button">
        <span>Upload Pic</span>
        <input type="file"  
          onChange={(e)=>updatePic(e.target.files[0])}
        />
        </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
      </div>
         </div>
       
        </div>

     
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",margin:"10px",padding:"10px"}}>
          
          {state?mypics.map(item=>{
              return(
                <img className="pic" 
        src={item.photo} key={item._id}/>
              )
          }):<h2>no post</h2>}

       
      
        </div>
        </div>
       
     
    )
}

export default Profile;