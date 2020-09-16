import React,{useContext} from "react";
import { Link,useHistory } from "react-router-dom";

import {UserContext} from "../App";



const NavBar =()=>{

  const {state,dispatch}=useContext(UserContext);

  const history=useHistory();

  const renderList=()=> {
    
    if(state){

      return [
        <li><Link to="/">Home</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><Link to="/followingpost">My Following post</Link></li>,
        
        <li>

        <button className="btn #cs2828 red darken-3" style={{margin:"5px"}} 
           onClick={()=>{
             localStorage.clear()
             dispatch({type:"CLEAR"})
             history.push("/signin")
           }}> Logout
      
            </button>
        </li>
      ]
    }
    else{
      return [
      <li><Link to="/signin">Signin</Link></li>,
      <li><Link to="/signup">Signup</Link></li>,
     
      ]
    }
  }
    return(
        <nav  style={{width:"100%",zIndex:100}}>
        <div className="nav-wrapper" >
        <div className="div">
          <Link to ={state?"/":"/signin"}  className="brand-logo">Kayalgram</Link>
          </div>
          <ul id="nav-mobile" className="right">
           

            {renderList()}
           
          
            
          </ul>
        </div>
      </nav>
            
    )
}

export default NavBar;