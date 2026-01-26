import { useState } from "react";
import axios from "axios";
import "../App.css"
const API_URL = "http://localhost:5000";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ token,setToken, setProfile,profile }) => {
  //const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //const [profile, setProfile] = useState(null);
  const [sign,setsign] = useState(true);
  const navigate = useNavigate();
  

//   console.log(token);
// Signup
  const signup = async () => {
    try {
      // client-side validation for password length
      if (!password || password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        return;
      }

      await axios.post(`${API_URL}/auth/signup`, { username, email, password });
      setPasswordError("");
      setMessage("Signup successful! Now login.");
      setsign(false);
    } catch (err) {
      const errMsg = err.response?.data?.error || "Signup failed";
      if (errMsg.toLowerCase().includes('password')) {
        setPasswordError(errMsg);
      } else {
        setMessage(errMsg);
      }
    }
  };

  // Login
  const login = async () => {
    try {
      // If email is provided, prefer email-based login, otherwise use username
      const payload = email ? { email, password } : { username, password };
      const res = await axios.post(`${API_URL}/auth/login`, payload);
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
  // const getProfile = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/auth/profile`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setProfile(res.data.user);
  //     setMessage(res.data.message);
  //   } catch (err) {
      
  //     setMessage(err.response?.data?.error || "Unauthorized");
  //   }
  // };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4 pt-16
 ">
      <div className="w-full max-w-5xl bg-white/95 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] border border-white/30">
        {/* Left Column - Hero Section */}
        <div className="relative md:w-1/2 bg-green-100 p-10 text-green-900 flex flex-col justify-between">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70" 
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80)' 
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Elecrosystems</h1>
            <p className="text-blue-100 text-lg">
              {sign 
                ? "Join our platform to manage your energy solutions efficiently."
                : "Welcome back! Please sign in to continue."}
            </p>
          </div>
          <div className="relative z-10">
            <div className="h-1 w-16 bg-white/30 mb-4"></div>
            <p className="text-blue-100 text-sm">
              {sign 
                ? "Already have an account?"
                : "New to Elecrosystems?"}
              <button 
                onClick={() => setsign(prev => !prev)}
                className="ml-2 font-semibold hover:underline"
              >
                {sign ? 'Sign in' : 'Create account'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center relative">
          <div className="absolute top-6 right-6">
            <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center text-teal-600 font-bold">E</div>
          </div>
          
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {sign ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 mb-8">
              {sign 
                ? 'Fill in your details to create an account'
                : 'Sign in to access your dashboard'}
            </p>

            {!token ? (
              <div className="space-y-5">
                {sign && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-200"
                      placeholder="Enter your username"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    {!sign && (
                      <a href="#" className="text-sm text-pink-500 hover:text-pink-600 transition-colors duration-200">Forgot password?</a>
                    )}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { 
                      setPassword(e.target.value);
                      setPasswordError("");
                      setMessage("");
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-200`}
                    placeholder={sign ? 'Create a password' : 'Enter your password'}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                <button
                  onClick={sign ? signup : login}
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-cyan-400 hover:from-pink-500 hover:to-cyan-500 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 shadow-md hover:shadow-lg"
                >
                  {sign ? 'Create Account' : 'Sign In'}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {sign ? 'Already have an account?' : 'New to Elecrosystems?'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setsign(prev => !prev)}
                  className="w-full py-3 px-4 border border-indigo-100 rounded-lg font-medium text-indigo-700 hover:bg-indigo-50 transition-all duration-300 hover:border-indigo-200"
                >
                  {sign ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-gray-600 w-24">Username:</span>
                      <span className="font-medium text-gray-800">{profile?.username}</span>
                    </div>
                    {profile?.email && (
                      <div className="flex items-center">
                        <span className="text-gray-600 w-24">Email:</span>
                        <span className="font-medium text-gray-800">{profile.email}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="text-gray-600 w-24">User ID:</span>
                      <span className="font-mono text-sm text-gray-600">{profile?._id}</span>
                    </div>
                  </div>
                </div>

                <NavLink
                  to="/"
                  onClick={logout}
                  className="block w-full py-3 px-4 text-center bg-red-50 text-red-600 font-medium rounded-lg border border-red-100 hover:bg-red-100 transition duration-200"
                >
                  Sign Out
                </NavLink>
              </div>
            )}

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
