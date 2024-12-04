import styles from "./Hods.module.css";
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function Hods({onLogout}){
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
        <h1>Hods</h1>
        <p>yha pr cards rahega</p>
      </div>
    </div>
        </>
    );

}

export default Hods;