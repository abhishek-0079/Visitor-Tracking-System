import styles from "./AdmissionCell.module.css";
import { FaUserAlt, FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../assets/logo1.png";
import admissionStaff from "./admissionStaff";

function AdmissionCell({ onLogout }) {
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
      navigate("/entry-form", { state: { staffId } });
    }, 1000);
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
        {loading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <p className={styles.heading}>Admission Cell</p>
            <div className={styles.staffContainer}>
              {admissionStaff.map((staff) => (
                <div
                  key={staff.id}
                  className={`${styles.staffCard} ${
                    selectedStaffId === staff.id ? styles.selected : ""
                  }`}
                  onClick={() => handleStaffClick(staff.id)}
                >
                  <div className={styles.image}>
                    <FaUser size="50px" />
                  </div>
                  <p className={styles.staffName}>{staff.name}</p>
                  <p className={styles.staffPosition}>{staff.position}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AdmissionCell;
