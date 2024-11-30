
import bgImg from '../assets/background.jpeg'
import logo from '../assets/logo.png'
import styles from './LoginPanel.module.css'
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

import {useNavigate,} from "react-router-dom";

function LoginPanel(){
  const validUsername ="admin";
  const validPass ="admin";
  const navigate = useNavigate();

  
  function verify(event){
    event.preventDefault();
    const username = document.getElementById('uname').value;
    const password = document.getElementById('pass').value;
    let para = document.getElementById('para');
    if(username ==validUsername && password ==validPass){
      navigate("/dashboard");
    }
   
    else{
      para.innerText = "Enter a valid Username or Password";
      para.style.color = "red"; 
      
    }
 
  };
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
            <div><FaUserAlt /> <input type="text"  id="uname" className={styles.input} placeholder='Username'  required/></div>
            <div> <RiLockPasswordLine/> <input type="password"  id = "pass" className={styles.input} placeholder='Password' required /></div>
            <p id ="para"></p>
           
            <button type="submit" className={styles.btn}>Login</button>
            <p  id ="reset" className={styles.resetPass} onClick={reset}>Forget password?</p>
            </form>
            
          </div>
        </>
    );

}

export default LoginPanel;