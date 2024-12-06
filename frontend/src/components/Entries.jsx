import React, { useEffect, useState } from "react";
import styles from "./Entries.module.css";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx"; // Import xlsx for Excel export
import logo from "../assets/logo1.png";
import Modal from "./Modal";


function Entries({ onLogout }) {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    onLogout();
    navigate("/");
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const deleteEntry = (indexToDelete) => {
    const updatedEntries = entries.filter((_, index) => index !== indexToDelete);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };

  const truncateData = (data) => {
    const maxLength = 32767; 
    if (typeof data === "string" && data.length > maxLength) {
      return data.slice(0, maxLength); 
    }
    return data;
  };

  const downloadExcel = () => {
    if (entries.length === 0) {
      alert("No entries available to download!");
      return;
    }
    const truncatedEntries = entries.map(entry => {
      return {
        name: truncateData(entry.name),
        phone: truncateData(entry.phone),
        location: truncateData(entry.location),
        image: entry.image ? truncateData(entry.image) : "N/A"
      };
    });
    const worksheet = utils.json_to_sheet(truncatedEntries);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Entries");
  writeFile(workbook, "Entries.xlsx"); 
  };

  const printEntries = () => {
    const printContent = document.getElementById("entriesTable").outerHTML; 
    const newWindow = window.open("", "_blank"); 
    newWindow.document.write(`
      <html>
        <head>
          <title>Entries</title>
          <style>
            table { width: 100%; border-collapse: collapse; margin: 20px 0; border-radius: 10px; }
            th, td { border: 1px solid black; padding: 10px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print(); 
  };

  return (
    <>
      <div className={styles.navbar}>
        <img src={logo} alt="ABES Logo" />
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
        <h1>Entries</h1>
        
        {entries.length === 0 ? (
          <p>No entries available</p>
        ) : (
          <table id="entriesTable" className={styles.entriesTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.location}</td>
                  <td>
                    {entry.image ? (
                    <button onClick={() => handleViewImage(entry.image)}>View Image</button>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteEntry(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
         
          
          
          
        )}
         <Modal show={!!selectedImage} onClose={handleCloseModal}>
          {selectedImage && <img src={selectedImage} alt="Entry" />}
        </Modal>
        <div className={styles.actionButtons}>
          <button onClick={downloadExcel} className={styles.downloadBtn}>
            Download
          </button>
          <button onClick={printEntries} className={styles.printBtn}>
            Print 
          </button>
        </div>
      </div>
    </>
  );
}

export default Entries;
