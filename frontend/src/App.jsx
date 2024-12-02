import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider
import LoginPanel from "./components/LoginPanel";
import DashBoard from "./components/DashBoard";

function ProtectedRoute({ isLoggedin, children }) {
  return isLoggedin ? children : <Navigate to="/" replace />;
}

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  
  useEffect(() => {
    const loggedInState = localStorage.getItem("isLoggedin");
    if (loggedInState === "true") {
      setIsLoggedin(true);
    }
  }, []);

  const handleLogin = () => {
    console.log("Login successful");
    setIsLoggedin(true);
    localStorage.setItem("isLoggedin", "true"); // Persist login state
  };

  const handleLogout = () => {
    console.log("Logout successful");
    setIsLoggedin(false);
    localStorage.removeItem("isLoggedin"); // Remove login state
  };

  return (
    <>
   <Router>
    <Routes>
      <Route path="*" element={<LoginPanel/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>

    </Routes>
   </Router>
    </> 
  );
}

export default App;
