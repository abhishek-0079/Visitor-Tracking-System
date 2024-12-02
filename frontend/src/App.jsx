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

  // Check logged-in state from local storage on initial load
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
    <SnackbarProvider maxSnack={3}> {/* Wrap your app with SnackbarProvider */}
      <Router>
        <Routes>
          {/* Public Route for Login */}
          <Route
            path="/"
            element={
              isLoggedin ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPanel onLogin={handleLogin} />
              )
            }
          />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedin={isLoggedin}>
                <DashBoard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
