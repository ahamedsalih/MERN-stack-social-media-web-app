import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from "./components/navbar";
import {BrowserRouter,Route, Switch,useHistory} from "react-router-dom";
import Home from "./components/home";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Profile from "./components/profile";
import CreatePost from "./components/createpost";
import './App.css';
import {reducer,initialState} from "./reducers/userReducer";
import UserProfile from "./components/userprofile";
import SubPost from "./components/subpost";

 export const UserContext=createContext();

  const Routing=()=>{

  const history=useHistory();
  const {state,dispatch}=useContext(UserContext);
 

  useEffect(()=>{
    
    const user =JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
     
    }else{
      history.push("/signin")
    }

  },[])



  return(

    <Switch>

    <Route exact path="/">

    <Home/>

    </Route>
    <Route path="/signup">

     <Signup/>

    </Route>
    <Route path="/signin">

     <Signin/>

     </Route>
     <Route exact path="/profile">

      <Profile/>

     </Route>
     <Route path="/createpost">

      <CreatePost/>

     </Route>
     <Route path="/profile/:userid">

      <UserProfile/>

     </Route>
     <Route path="/followingpost">

      <SubPost/>

     </Route>
     </Switch>

  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing/>

    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
