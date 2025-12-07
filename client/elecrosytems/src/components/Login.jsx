import { useState } from "react";
import axios from "axios";
import "../App.css"
const API_URL = "http://localhost:5000";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ token,setToken, setProfile,profile }) => {
  //const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //const [profile, setProfile] = useState(null);
  const [sign,setsign] = useState(true);
  const navigate = useNavigate();

//   console.log(token);
  // Signup
  const signup = async () => {
    try {
      await axios.post(`${API_URL}/auth/signup`, { username, password });
      setMessage("Signup successful! Now login.");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  // Login
  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage("Login successful!");
      navigate("/");
      
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfile(null);
    setMessage("Logged out!");
  };

  // Get profile
  const getProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
      setMessage(res.data.message);
    } catch (err) {
      
      setMessage(err.response?.data?.error || "Unauthorized");
    }
  };

  return (
    
  <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
  <div className="backdrop-blur-xl bg-white/60 shadow-xl  p-10 w-full max-w-md border border-white/30">
    
    <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
      Welcome 
    </h1>

    {!token ? (
      <div className="flex flex-col gap-4">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 h-12 rounded-md border border-black/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/40"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 h-12 rounded-md border border-black/20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/40"
        />


        <button
          onClick={sign?signup:login}
          className="w-full py-3 rounded-md bg-linear-to-r from-cyan-600 to-purple-600 text-white font-semibold hover:opacity-80 transition"
        >
          {sign?"signup":"Login"}
        </button>
        <div className="flex flex-row justify-center">
        <h1 className="w-fit">
        {sign ? "Already have an account ? " :  "Dont have a account? "}
        </h1>
        <button
            onClick={()=>setsign(prev => !prev)}
            className="w-fit ml-2 text-blue-500"

        >   
          {sign ? " Login" :  "Signup"}
                
        </button>
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        <button
          onClick={getProfile}
          className="w-full py-3 rounded-md bg-black text-white font-semibold hover:bg-black/80 transition"
        >
           Profile
        </button>

        <NavLink to={"/"}
          onClick={logout}

          className="w-full py-3 text-center rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Logout
        </NavLink>
      </div>
    )}

    {message && (
      <p className="mt-6 text-center text-black/70 font-medium">{message}</p>
    )}

    {profile && (
      <div className="mt-6 bg-white/50 p-4 rounded-md shadow-md border border-white/40">
        <h2 className="text-xl font-semibold mb-2">User Profile</h2>
        <p className="text-black/80">Username: {profile.username}</p>
        <p className="text-black/80">User ID: {profile._id}</p>
      </div>
    )}
  </div>
</div>

  );
}

export default Login;
