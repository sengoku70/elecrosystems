import { useState,useEffect, useTransition, use, Profiler } from 'react'
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,Routes, Route,NavLink } from "react-router-dom";
import Homepage from "./components/Homepage";
import Infopage from "./components/Infopage";
import Login from './components/Login';
import Customcircuit from './components/Customcircuit'
import Community from './components/Community.jsx';
import Cookies from "js-cookie"
const API_URL = "http://localhost:5000";
import './App.css'




function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile,setProfile] = useState("")

  
  

  useEffect(() => {
  console.log("profile:",profile);
  if (!token) return; // no token → skip

  const getProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setProfile(res.data.user);
      console.log(setProfile);
    

    } catch (err) {
      console.log(err.response?.data?.error || "Unauthorized");
    }
  };

  getProfile();
}, [token]);

  return (
    <>
    <Router>
    <nav className="navigation px-6 h-[100px] flex row items-center fixed w-8/10 z-30 bg-white/40 shadow-2xl mx-50 mt-2 backdrop-blur-[5px] font-[Science gothic] text-[30px] flex gap-4">
        <NavLink  to="/">Home</NavLink>
        <hr  className='h-[50px] w-2.5 bg-black'/>
        <NavLink  to="/Infopage">Learn</NavLink>
        <hr  className='h-[50px] w-2.5 bg-black'/>
        <NavLink  to="/Customcircuit">Custom System</NavLink>
        <hr  className='h-[50px] w-2.5 bg-black'/>
        <NavLink  to="/Community">Community</NavLink>
        <hr  className='h-[50px] w-2.5 bg-black'/>
        {!token ? (

          <NavLink to="/login">Login</NavLink>
          
        ) : (
          <NavLink to="/login">Logout</NavLink>
        )}
        <hr  className='h-[50px] w-2.5 bg-black'/>
      
        {token ? (
        <div className='ml-auto w-fit h-fit p-2 bg-black text-white'>{profile.username}</div>
        
        ):""} 
        <img src='src/assets/image/Untitled.png'  className={`h-[100px] ${token? "ml-4": "ml-auto" }  w-fit`}/>
        
    </nav>
    
    <Routes className="mb-[100px]">
          <Route path="/" element={<Homepage />} />
          <Route path="/InfoPage" element={<Infopage />} />
          <Route path="/Login" element={<Login token={token} setToken={setToken} setProfile={setProfile} profile={profile}/>} />
          <Route path="/Customcircuit" element={<Customcircuit />} />
          <Route path="/Community" element={<Community />} />
          
        
    </Routes>
      
    </Router>
    
    
  </>
  )
}

export default App
