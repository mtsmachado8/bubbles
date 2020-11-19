import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import Modal from "../Modal/Modal";

import styles from './_newBubbleModal.module.css';

type Props = {
  onClose: any;
  onSubmitNewBubble: any;
};

// id client: 17940802887-ohvi1iv0t9bi0npo26cetochgff4u16e.apps.googleusercontent.com
// secret key: 0XGx-Zf3FP0kMh2g725BvfHH

const BubbleDetails: React.FC<Props> = ({ onClose, onSubmitNewBubble }: Props) => {
  const [ isLogedIn, setIsLogedIn ] = useState(false);

  const [ description, setDescription ] = useState('');
  const [ content, setContent ] = useState('');
  const [ title, setTitle ] = useState('');

  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');

  const placeholder = 'Tell us:\n\n1 - What is the problem?\n2 - How to fix?\n3 - What are the possible problems after fix it?';
  const submitButton = isLogedIn ? `Submit with ${firstName}` : 'Submit Anonymously';
  const image = avatarUrl
    ? avatarUrl
    : '/anonymous-image.png';

  const onSuccessGoogle = response => {
    setAvatarUrl(response.profileObj.imageUrl);
    setEmail(response.profileObj.email);
    setName(response.profileObj.name);
    setFirstName(response.profileObj.givenName);
    setIsLogedIn(true);
  };

  const onFailureGoogle = response => {
    console.log(response);
    alert('Ops... Houve um erro na conexão.');
  };

  const onLogoutGoogle = () => {
    setAvatarUrl('');
    setEmail('');
    setName('');
    setFirstName('');
    setIsLogedIn(false);
  };

  return(
    <Modal onClose={onClose}>
      <div className={styles.newBubblePage}>
        <img src={image} alt="Avatar"/>
        <div className={styles.square}></div>
        <form onSubmit={onSubmitNewBubble} className={styles.newBubbleDetails}>
          <div className={styles.titleContainer}>
            <input name='title' onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input name='description' onChange={e => setDescription(e.target.value)} placeholder="Brief description about the bubble"/>
          </div>
          <div className={styles.textContent}>
            <div className={styles.typeText}>
              <p>Write</p>
            </div>
            <textarea name='content' onChange={e => setContent(e.target.value)} className={styles.textArea} placeholder={placeholder} />
            <div className={styles.buttonContent}>
              <button type="submit" className={styles.anonymous}>{submitButton}</button>

              {isLogedIn ? 
                <GoogleLogout
                  clientId="17940802887-ohvi1iv0t9bi0npo26cetochgff4u16e.apps.googleusercontent.com"
                  onLogoutSuccess={onLogoutGoogle}
                  render={renderProps => (
                    <button 
                      onClick={renderProps.onClick} 
                      disabled={renderProps.disabled}
                      type='button'
                      >Logout</button>
                  )}
                /> 
              : <GoogleLogin
                clientId="17940802887-ohvi1iv0t9bi0npo26cetochgff4u16e.apps.googleusercontent.com"
                isSignedIn={true}
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button 
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type='button'
                    >Login with Google</button>
                )}/>
              }
            </div>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default BubbleDetails