import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./EntryForm.module.css";
import { FaUserAlt, FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function EntryForm({onLogout}) {
  const location = useLocation();
  const { staffId } = location.state || {};

  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null); // Track selected staff
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStaffClick = (staffId) => {
    setSelectedStaffId(staffId);
    setLoading(true); // Show loader during navigation
    setTimeout(() => {
      navigate("/visitor-entry", { state: { staffId } });
    }, 1000);
  };

  const handleEntriesClick = () => {
    navigate("/entries"); // Navigate to Entries.jsx
  };

  return (
    <>
     <div className={styles.navbar}>
        <img src={logo} alt="ABES Logo" />
        <button className={styles.entriesBtn} onClick={handleEntriesClick}>
          Entries
          <CiLogin size={25} className={styles.loginIcon} />
        </button>
        <div className={styles.admin} onClick={toggleDropdown}>
          <p className={`${styles.adminName} ${styles.hideOnMobile}`}>
            {username || "ABES Guard"}
          </p>
          <FaUserAlt size={28} className={styles.adminImg} />
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <p className={styles.showOnMobile}>
                {username || "ABES Guard"}
              </p>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mainContainer}>
      <div>
      <h1>Visitor Entry</h1>
   <p>form yha bhrna hai</p>
    </div>
      </div>

    
    </>
  );
}

export default EntryForm;