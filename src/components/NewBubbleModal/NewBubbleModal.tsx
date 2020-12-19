import React, { useContext, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';
import AuthContext from '../../infra/contexts/AuthContext';

import Modal from '../Modal/Modal';

import styles from './_newBubbleModal.module.css';

type Props = {
  onClose: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onSubmitNewBubble: Function;
};

const BubbleDetails: React.FC<Props> = ({ onClose, onSubmitNewBubble }: Props) => {
  const { 
    userProfile,
    login,
    logout,
  } = useContext(AuthContext);
  
  const [ description, setDescription ] = useState('');
  const [ content, setContent ] = useState('');
  const [ title, setTitle ] = useState('');

  const placeholder = 'Tell us:\n\n1 - What is the problem?\n2 - How to fix?\n3 - What are the possible problems after fix it?';
  const submitButton = userProfile ? `Submit with ${userProfile.firstName}` : 'Submit Anonymously';
  const image = userProfile?.avatarUrl
    ? userProfile?.avatarUrl
    : '/anonymous-image.png';

  const bubble = {
    description,
    content,
    title,
  };

  return(
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <section className={styles.newBubblePage}>
          <img src={image} alt="Avatar"/>
          <div className={styles.square}></div>
          <form
            className={styles.newBubbleDetails}
            onSubmit={e => {
              e.preventDefault();
              onSubmitNewBubble(bubble, userProfile);
            }}
          >
            <div className={styles.titleContainer}>
              <input
                name='title'
                autoFocus
                required
                autoComplete='off'
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}  
              />
              <input
                name='description'
                required
                autoComplete='off'
                placeholder="Brief description about the bubble"
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className={styles.textContent}>
              <div className={styles.typeText}>
                <p>Write</p>
              </div>
              <textarea
                name='content'
                required 
                className={styles.textArea}
                placeholder={placeholder} 
                onChange={e => setContent(e.target.value)}
              />

                {userProfile 
                  ? 
                    <button 
                      onClick={logout} 
                      type='button'
                    >Logout
                    </button>
                  : 
                    <button 
                      onClick={login}
                    >Login</button>
                }
              </div>
          </form>
        </section>

        <aside className={styles.labelsContent}>
          
        </aside>
      </div>
    </Modal>
  );
};

export default BubbleDetails
