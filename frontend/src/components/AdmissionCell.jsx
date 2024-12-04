import styles from "./AdmissionCell.module.css";
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../assets/logo1.png";
import { FaUser } from "react-icons/fa";
import admissionStaff from "./admissionStaff";

function AdmissionCell({onLogout}){
    const [username, setUsername] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
   
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("username");
      onLogout();
      navigate("/");
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    
    return (

        <>
         <div className={styles.navbar}>
        <img src={logo} alt="ABES Logo" />
        <button className={styles.entriesBtn}>
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
      <div className={styles.selectedContainer}>
        <p className={styles.heading}>Admission Cell</p>
        
        <div className={styles.staffContainer}>
            {admissionStaff.map((staff) => (
              <div key={staff.id} className={styles.staffCard}>
                 <div className={styles.image}><FaUser size="50px"/></div>
                <p className={styles.staffName}>{staff.name}</p>
                <p className={styles.staffPosition}>{staff.position}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
        </>
    );

}

export default AdmissionCell;