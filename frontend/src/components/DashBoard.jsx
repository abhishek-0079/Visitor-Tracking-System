import styles from "./DashBoard.module.css";
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function DashBoard({ onLogout }) {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (route) => {
    setLoading(true); // Simulate loading when navigating
    setTimeout(() => {
      navigate(route);
    }, 1000); // Delay for navigation
  };

  const lOptions = [
    { name: "Admission Cell", route: "/admissioncell" },
    { name: "Registrar Office", route: "/registraroffice" },
    { name: "HODs", route: "/hods" },
  ];

  const rOptions = [
    { name: "Faculties", route: "/faculties" },
    { name: "Students", route: "/students" },
    { name: "Staff Members", route: "/staffmembers" },
  ];

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
        {loading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>Loading, please wait...</p>
          </div>
        ) : selectedOption ? (
          <div className={styles.selectedContainer}>
            <h1>{selectedOption}</h1>
          </div>
        ) : (
          <div className={styles.options}>
            <div className={styles.left}>
              {lOptions.map((leftOption, index) => (
                <div
                  key={index}
                  className={styles.leftOption}
                  onClick={() => handleOptionClick(leftOption.route)}
                >
                  {leftOption.name}
                </div>
              ))}
            </div>
            <p>Whom you want to meet?</p>
            <div className={styles.right}>
              {rOptions.map((rightOption, index) => (
                <div
                  key={index}
                  className={styles.rightOption}
                  onClick={() => handleOptionClick(rightOption.route)}
                >
                  {rightOption.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashBoard;
