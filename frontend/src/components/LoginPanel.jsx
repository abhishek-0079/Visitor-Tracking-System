
import bgImg from '../assets/background.jpeg'
import logo from '../assets/logo.png'
import styles from './LoginPanel.module.css'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';

import {useNavigate,} from "react-router-dom";
import { useState } from 'react';

function LoginPanel(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const  verify = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:7001/api/auth/login',{
        username,
        password,
      });
      if(res.status === 200){
        localStorage.setItem('username', username);
        navigate("/dashboard");
      }else{
        setError(res.data.message || 'Enter a valid Username or Password');
    }
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again.');
      }
  };
  };
  //   const username = document.getElementById('uname').value;
  //   const password = document.getElementById('pass').value;
  //   let para = document.getElementById('para');
  //   if(username ==validUsername && password ==validPass){
  //     navigate("/dashboard");
  //   }
   
  //   else{
  //     para.innerText = "Enter a valid Username or Password";
  //     para.style.color = "red"; 
      
  //   }
 
  // };
   function reset(){
    window.location.href="https://abes.web.simplifii.com/index.php#reminder";

 };

    return (
        <>
          <img src ={bgImg}  className={styles.bgImg}/>
          <div className={styles.mainContainer}>
            <p className={styles.heading}>AVTS</p>
            <p className={styles.subHeading1}>ABES Visitor
            Tracking System
            </p>
            <img src= {logo} className={styles.logo} loading="lazy" />
            <p className={styles.subHeading2}>LOGIN TO <span>DASHBOARD</span></p>
            <form className={styles.inputField} onSubmit={verify}> 
            <div><FaUserAlt /> <input type="text"  id="uname" className={styles.input} placeholder='Username' value={username}
    onChange={(e) => setUsername(e.target.value)} required/></div>
            <div> <RiLockPasswordLine/> <input type="password"  id = "pass" className={styles.input} placeholder='Password' value={password}
    onChange={(e) => setPassword(e.target.value)} required /></div>
            <p id ="para"></p>
           
            <button type="submit" className={styles.btn}>Login</button>
            <p  id ="reset" className={styles.resetPass} onClick={reset}>Forget password?</p>
            </form>
            
          </div>
        </>
    );

}

export default LoginPanel;