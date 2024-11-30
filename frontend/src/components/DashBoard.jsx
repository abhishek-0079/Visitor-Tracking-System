import styles from './DashBoard.module.css'
import bgImg from '../assets/background.jpeg'
import { FaUserAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from 'react';

function DashBoard(){
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if(storedUsername){
            setUsername(storedUsername);
        }
    }, []);
    return (
        <>
           <div className={styles.mainContainer}>
           <img src ={bgImg}  className={styles.bgImg}/>
           <div className={styles.navbar}>
                <span>AVTS</span>
                <button className={styles.entriesBtn}> <CiLogin size={25} className={styles.loginIcon}/>Entries</button>
                <div className={styles.admin}>
                    <p className={styles.adminName}>{username || 'ABES Guard'}</p>
                    <FaUserAlt  size={28} className={styles.adminImg}/>

                </div>
           </div>
          
            

           </div>
        </>
    );
}
export default DashBoard;