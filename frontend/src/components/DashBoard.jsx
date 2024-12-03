import styles from './DashBoard.module.css';
import bgImg from '../assets/background.jpeg';
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function DashBoard({ onLogout }) {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const [selectedCard, setSelectedCard] = useState(null); // State for selected card
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const cardData = [
    { id: 'admission', name: 'Admission Cell' },
    { id: 'registrar', name: 'Registrar' },
    { id: 'hods', name: 'HODs' },
    { id: 'faculties', name: 'Faculties' },
    { id: 'students', name: 'Students' },
    { id: 'others', name: 'Others' },
  ];

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };

  const renderCardContent = () => {
    switch (selectedCard) {
      case 'admission':
        return <p>Content for Admission Cell</p>;
      case 'registrar':
        return <p>Content for Registrar</p>;
      case 'hods':
        return <p>Content for HODs</p>;
      case 'faculties':
        return <p>Content for Faculties</p>;
      case 'students':
        return <p>Content for Students</p>;
      case 'others':
        return <p>Content for Others</p>;
      default:
        return <p>Please select a card to view details.</p>;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <img src={bgImg} className={styles.bgImg} alt="Background" />
      <div className={styles.navbar}>
        <img src={logo} alt="ABES Logo" />
        <button className={styles.entriesBtn}>
          <CiLogin size={25} className={styles.loginIcon} />
          Entries
        </button>
        <div className={styles.admin} onClick={toggleDropdown}>
          <p className={`${styles.adminName} ${styles.hideOnMobile}`}>
            {username || 'ABES Guard'}
          </p>
          <FaUserAlt size={28} className={styles.adminImg} />
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <p className={styles.showOnMobile}>
                {username || 'ABES Guard'}
              </p>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.contentContainer}>
  <div className={styles.cardContainer}>
    <div className={styles.cardColumn}>
      <div
        className={`${styles.card} ${selectedCard === 'admission' ? styles.activeCard : ''}`}
        onClick={() => handleCardClick('admission')}
      >
        Admission Cell
      </div>
      <div
        className={`${styles.card} ${selectedCard === 'registrar' ? styles.activeCard : ''}`}
        onClick={() => handleCardClick('registrar')}
      >
        Registrar
      </div>
      <div
        className={`${styles.card} ${selectedCard === 'hods' ? styles.activeCard : ''}`}
        onClick={() => handleCardClick('hods')}
      >
        HODs
      </div>
    </div>
    <div className={styles.cardColumn}>
      <div
        className={`${styles.card} ${selectedCard === 'faculties' ? styles.activeCard : ''}`}
        onClick={() => handleCardClick('faculties')}
      >
        Faculties
      </div>
      <div
        className={`${styles.card} ${selectedCard === 'students' ? styles.activeCard : ''}`}
        onClick={() => handleCardClick('students')}
      >
        Students
      </div>
      <div
        className={`${styles.card} ${selectedCard === 'others' ? styles.activeCard : ''}`}
        onClick={() => handleCardClick('others')}
      >
        Others
      </div>
    </div>
  </div>
  <div className={styles.centerShapeContainer}>
          <div className={styles.centerShape}>
            <p>Whom you want to meet?</p>
          </div>
        </div>
  <div className={styles.detailsContainer}>
    {renderCardContent()}
  </div>
</div>

    </div>
  );
}

export default DashBoard;
