import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hods.module.css";
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import logo from "../assets/logo1.png";
import admissionStaff from "./admissionStaff";

function HODs({ onLogout }) {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleStaffClick = (staff) => {
    setLoading(true); 
    setTimeout(() => {
      navigate("/entry-form", { state: {selectedStaff: staff } }); 
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
            <p className={styles.heading}>HOD(s)</p>
            <div className={styles.staffContainer}>
              {admissionStaff.map((staff) => (
                <div
                  key={staff.id}
                  className={styles.staffCard}
                  onClick={() => handleStaffClick(staff)} // Pass full staff object
                >
                  <div className={styles.image}>
                    <img src={staff.image} alt="Staff" className={styles.staffImg} />
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

export default HODs;
