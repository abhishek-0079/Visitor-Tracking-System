import { useState } from 'react';
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import styles from './LoginPanel.module.css';
import bgImg from '../assets/background.jpeg';
import logo from '../assets/logo.png';

function LoginPanel({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();  

  const verify = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:7001/api/auth/login', {
        username,
        password,
      });
      console.log('Server Response:', res);
      if (res.status === 200) {
        localStorage.setItem('username', username);
        onLogin();
        navigate("/dashboard");
      } else {
        enqueueSnackbar(res.data.message || 'Invalid username or password', { variant: 'error' });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        enqueueSnackbar(`Error: ${error.response.status} - ${error.response.data.message || 'Please try again'}`, { variant: 'error' });
      } else {
        enqueueSnackbar('An error occurred. Please check your network or try again later.', { variant: 'error' });
      }
    }
  };

  return (
    <>
      <img src={bgImg} className={styles.bgImg} />
      <div className={styles.mainContainer}>
        <p className={styles.heading}>AVTS</p>
        <p className={styles.subHeading1}>ABES Visitor Tracking System</p>
        <img src={logo} className={styles.logo} loading="lazy" />
        <p className={styles.subHeading2}>LOGIN TO <span>DASHBOARD</span></p>
        <form className={styles.inputField} onSubmit={verify}>
          <div><FaUserAlt /> <input
            type="text"
            id="uname"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /></div>
          <div><RiLockPasswordLine /> <input
            type="password"
            id="pass"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /></div>
          <button type="submit" className={styles.btn}>Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPanel;
