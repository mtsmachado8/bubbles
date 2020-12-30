import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../infra/contexts/AuthContext';
import Avatar from '../Avatar/Avatar';

import styles from './_asideHome.module.css';

const AsideHome: React.FC = () => {
  const { 
    loggedUser,
    login,
    logout,
  } = useContext(AuthContext);

  const name = loggedUser ? loggedUser.name : 'Anonymous';
  const email = loggedUser ? loggedUser.email : null;
  const image = loggedUser ? loggedUser.avatarUrl : '/anonymous-image.png';

  return (
    <div className={styles.asideHome}>
      <div className={styles.userContent}>
        <div className={styles.image}>
          <Avatar 
            src={image}
            key={image}
            alt='Author Avatar'
            size={80}
          />
        </div>
        <div className={styles.userDetails}>
          <p className={styles.name}>{name}</p>
          <p className={styles.email}>{email}</p>
        </div>
      </div>
      <div className={styles.buttonContent}>
        {loggedUser
        ? <button 
            type='button'
            className={styles.button}
            onClick={logout}
          >Logout</button>

        : <button 
            type='button'
            className={styles.button}
            onClick={login}
          >Login</button>
        }
      </div>
    </div>
  );
};

export default AsideHome;