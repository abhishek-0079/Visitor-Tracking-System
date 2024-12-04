import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider
import LoginPanel from "./components/LoginPanel";
import DashBoard from "./components/DashBoard";
import AdmissionCell from "./components/AdmissionCell";
import Registraroffice from "./components/RegistrarOffice";
import Hods from "./components/Hods";
import Faculties from "./components/Faculties";
import Students from "./components/Students";
import StaffMembers from "./components/StaffMembers";



function ProtectedRoute({ isLoggedin, children }) {
  return isLoggedin ? children : <Navigate to="/dashboard" replace />;
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
      <Route path="/" element={<LoginPanel onLogin={() => {}}/>}/>
      <Route path="/dashboard" element={<DashBoard onLogout={handleLogout}/>}/>
      <Route path="/admissioncell" element={<AdmissionCell/>}/>
      <Route path="/registraroffice" element={<Registraroffice/>}/>
      <Route path="/hods" element={<Hods/>}/>
      <Route path="/faculties" element={<Faculties/>}/>
      <Route path="/students" element={<Students/>}/>
      <Route path="/staffmembers" element={<StaffMembers/>}/>
      
      

    </Routes>
   </Router>
    </> 
  );
}

export default App;
