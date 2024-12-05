import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EntryForm.module.css";
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import logo from "../assets/logo1.png";

function EntryForm({ onLogout }) {
  const location = useLocation();
  const { selectedStaff } = location.state || {}; // Get selectedStaff from state

  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

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

  const handleEntriesClick = () => {
    navigate("/entries");
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
              <p className={styles.showOnMobile}>{username || "ABES Guard"}</p>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <p className={styles.heading}>HOD Details</p>
          {selectedStaff ? (
            <div className={styles.staffDetails}>
              <div className={styles.staffImage}>
                <img
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  className={styles.staffImg}
                />
              </div>
              <p className={styles.staffName}>{selectedStaff.name}</p>
              <p className={styles.staffPosition}>{selectedStaff.position}</p>
              <div className={styles.location}>
                <p className={styles.subHeading}>Location:</p>
                <p>Bhabha Block, 3rd Floor, Faculty Room</p>
              </div>
            </div>
          ) : (
            <p>No staff details available.</p>
          )}
          <button className={styles.staffBtn}>Send For Approval</button>
        </div>
        <div className={styles.rightContainer}>
        <p className={styles.heading}> Visitors' Detail</p>
          <div className={styles.container}>
          <form className={styles.inputContainer}>
        <h3>Visitor entry form</h3>
           </form>
           <div className={styles.webCam}>
            <h3>Visitor img section</h3>
           </div>
          </div>
    
        </div>
      </div>
    </>
  );
}

export default EntryForm;
