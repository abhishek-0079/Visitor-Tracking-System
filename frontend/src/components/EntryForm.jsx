import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EntryForm.module.css";
import { FaUserAlt } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";

import { FaLocationDot } from "react-icons/fa6";


import { CiLogin } from "react-icons/ci";
import logo from "../assets/logo1.png";

function EntryForm({ onLogout }) {
  const location = useLocation();
  const { selectedStaff } = location.state || {}; 

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
              <div>
                <FaUserAlt size={20} />
                <input type="text" placeholder="Full name" required />
              </div>
              <div>
                <PiPhoneCallFill size={24} />
                <input type="tel" placeholder="Phone Number" required />
              </div>

              <div>
                
                <BsFillPeopleFill size={24} />
                <select >
                  <option value="heading" aria-selected>Add-on peoples</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <FaLocationDot size={24}/>
                <select>
                  <option value="heading" selected>From where you came from?</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gorakhpur">Gorakhpur</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Kanpur">Kanpur</option>
                  <option value="Varanasi">Varanasi</option>
                </select>

              </div>
              <button className={styles.captureBtn}>Capture Image</button>
              <div className={styles.approvalBtn}>
                <button className={styles.approve}>Approve</button>
                <button className={styles.disApprove}>Disapprove</button>

              </div>
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
