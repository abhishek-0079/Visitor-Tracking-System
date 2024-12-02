import styles from './DashBoard.module.css';
import bgImg from '../assets/background.jpeg';
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashBoard({ onLogout }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear localStorage
    onLogout(); // Update parent component's state (if any)
    navigate('/'); // Redirect to login page
  };

  return (
    <div className={styles.mainContainer}>
      <img src={bgImg} className={styles.bgImg} alt="Background" />
      <div className={styles.navbar}>
        <span>AVTS</span>
        <button className={styles.entriesBtn}>
          <CiLogin size={25} className={styles.loginIcon} />
          Entries
        </button>
        <div className={styles.admin}>
          <p className={styles.adminName}>{username || 'ABES Guard'}</p>
          <FaUserAlt size={28} className={styles.adminImg} />
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
