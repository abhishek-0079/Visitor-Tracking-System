import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EntryForm.module.css";
import { FaUserAlt } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import Webcam from "react-webcam";

import { FaLocationDot } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import logo from "../assets/logo1.png";


function EntryForm({ onLogout }) {
  const location = useLocation();
  const { selectedStaff } = location.state || {};

  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showGreenTick, setShowGreenTick] = useState(false); 
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const webcamRef = React.useRef(null);

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

  const capturePhoto = () => {
    if (webcamRef?.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setShowWebcam(false);
    }
  };

  const handleCaptureButtonClick = () => {
    setShowWebcam(true);
    setCapturedImage(null);

    let countdownTimer = 3;
    const countdownInterval = setInterval(() => {
      if(countdownTimer > 0) {
        setCountdown(countdownTimer);
        countdownTimer -= 1;
      }else{
        capturePhoto();
        clearInterval(countdownInterval);
      }
    }, 1000);

   
  };

  const handleApprove = (e) => {
    e.preventDefault();
    setShowGreenTick(true);

    // Log entry in localStorage for simplicity
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const newEntry = {
      name: e.target.elements.name.value,
      phone: e.target.elements.phone.value,
      location: e.target.elements.location.value,
      image: capturedImage,
    };
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));

    setTimeout(() => {
      setShowGreenTick(false);
    }, 4000); 
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
          <p className={styles.heading}>Visitors' Detail</p>
          {showGreenTick ? (
            <img
              src='https://media.tenor.com/HbpenGYruKEAAAAM/verifi.gif'
              alt="Approved"
              className={styles.greenTickGif}
            />
          ) : (
            <div className={styles.container}>
              <form className={styles.inputContainer} onSubmit={handleApprove}>
                <div>
                  <FaUserAlt size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <PiPhoneCallFill size={24} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div>
                  <BsFillPeopleFill size={24} />
                  <select>
                    <option value="heading" aria-selected>
                      Add-on peoples
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <FaLocationDot size={24} />
                  <select name="location" required>
                    <option value="" selected disabled>
                      From where you came from?
                    </option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gorakhpur">Gorakhpur</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Kanpur">Kanpur</option>
                    <option value="Varanasi">Varanasi</option>
                  </select>
                </div>
                <button
                  className={styles.captureBtn}
                  onClick={handleCaptureButtonClick}
                  type="button"
                >
                  {capturedImage ? "Retake Image" : "Capture Image"}
                </button>
                
                <div className={styles.approvalBtn}>
                  <button className={styles.approve} type="submit">
                    Approve
                  </button>
                  <button className={styles.disApprove} type="button">
                    Disapprove
                  </button>
                </div>
              </form>
              <div className={styles.webCam}>
                {showWebcam && (
                  <>
                  <Webcam
                    mirrored={true}
                    screenshotQuality={1}
                    imageSmoothing={true}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className={styles.showWebcam}
                    />
                  <div className={styles.countdown}>
                  {countdown > 0 ?  <p>{countdown}</p> : <p className={styles["cheese-text"]}>Stay Steady</p>}
                </div>
                </>
                )}
                {capturedImage && (
                  <div className={styles.capturedImageContainer}>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className={styles.capturedImage}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EntryForm;
