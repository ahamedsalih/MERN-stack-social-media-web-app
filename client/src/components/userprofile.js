import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from "../App";
import {useParams} from "react-router-dom";

const UserProfile =()=>{

    const {state,dispatch}=useContext(UserContext);
   

    const [userProfile,setProfile]=useState(null);

    

    const {userid}=useParams();
    console.log(userid);
    const [showFollow,setShowFollow]=useState(state?!state.following.includes(userid):true);


     useEffect(()=>{
      fetch(`/user/${userid}`,{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
     }).then(res=>res.json())
     .then(result=>{
       
         setProfile(result)
      })
     },[])



     const followUser=()=>{
     fetch("/follow",{
         method:"put",
         headers:{
             "Content-Type":"Application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
             followId:userid
         })
     }).then(res=>res.json())
     .then(data=>{
        
         dispatch({type:"UPDATE",payload:{following:data.following,
        followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState)=>{
           return{
            ...prevState,
            user:{...prevState.user,
            followers:[...prevState.user.followers,data._id]}
           } 
        })
        setShowFollow(false);
     })
     }

     const unfollowUser=()=>{
     fetch("/unfollow",{
         method:"put",
         headers:{
             "Content-Type":"Application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         },
         body:JSON.stringify({
             followId:userid
         })
     }).then(res=>res.json())
     .then(data=>{
        
         dispatch({type:"UPDATE",payload:{following:data.following,
        followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState)=>{
            const newFollower=prevState.user.followers.filter(item=>item !=data._id)
           return{
               
            ...prevState,
            user:{
                ...prevState.user,
            followers:newFollower
        }
           } 
        })
        setShowFollow(true)
     })
     }

    return(
        <>
        {userProfile? 

            <div className="profile" style={{marginTop:"30px",maxWidth:"550px",margin:"0px auto"}}>
        <div className="profilediv" style={{marginTop:"30px"}}>

        <img style={{height:"160px",width:"160px",borderRadius:"80px",marginBottom:"10px"}}
         src={userProfile.user.pic}/>
         
         <div style={{marginLeft:"30px",marginTop:"-30px"}}>
         
         <h5>{userProfile.user.name}</h5>
         <h5>{userProfile.user.email}</h5>
    
         <div style={{display:"flex",justifyContent:"space-between",width:"104%"}}>
             <h5>{userProfile.posts.length} posts</h5>
             <h5>{userProfile.user.followers.length} followers</h5>
             <h5>{userProfile.user.following.length} following</h5>

             </div>
             {showFollow?<button className="btn waves-effect pink waves-light" 
         onClick={()=>followUser()}> follow
    
          </button>:<button className="btn waves-effect pink waves-light" 
         onClick={()=>unfollowUser()}> unfollow
    
          </button>}
             
       
      
    
             
         </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",margin:"10px",padding:"10px"}}>
          
          {userProfile.posts.map(item=>{
              return(
                <img className="pic" 
        src={item.photo} key={item._id}/>
              )
          })}

       
      
        </div>
        </div>
        
        :<h2>loading...</h2>}
        
        </>
       
     
    )
}

export default UserProfile;