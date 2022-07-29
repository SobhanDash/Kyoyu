import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

import styles from'./backbutton.module.css';

const BackButton = () => {
  const history = useHistory();
  
  const redirectToHome = (e)=> {
    e.preventDefault();
    history.push('/');
  }

  return (
    <div className={styles.backbutton}>
        <FontAwesomeIcon icon={faCircleArrowLeft} className={styles.backbtn} onClick={redirectToHome} />
    </div>
  )
}

export default BackButton