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
import EntryForm from "./components/EntryForm";
import Entries from "./components/Entries";



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
      <Route path="/admission-cell" element={<AdmissionCell onLogout={handleLogout}/>}/>
      <Route path="/registrar-office" element={<Registraroffice onLogout={handleLogout}/>}/>
      <Route path="/hods" element={<Hods onLogout={handleLogout} />}/>
      <Route path="/faculties" element={<Faculties onLogout={handleLogout}/>}/>
      <Route path="/students" element={<Students onLogout={handleLogout}/>}/>
      <Route path="/staff-members" element={<StaffMembers onLogout={handleLogout}/>}/>
      <Route path="/entry-form" element={<EntryForm  onLogout={handleLogout}/>} />
      <Route path="/entries" element={<Entries onLogout ={handleLogout}/>}/>
      
      

    </Routes>
   </Router>
    </> 
  );
}

export default App;
