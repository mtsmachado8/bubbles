import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import styles from './_newComment.module.css';

type Props = {
  id?: string
  onClose: any
  onSubmitNewComment: any
}

const NewComment: React.FC<Props> = ({ onClose, onSubmitNewComment }: Props) => {
  const [ isLogedIn, setIsLogedIn ] = useState(false);

  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');

  const [ comment, setComment ] = useState('');

  const submitButton = isLogedIn ? `Comment with ${firstName}` : 'Comment Anonymously';
  const userName = isLogedIn ? `${name}` : 'Anonymous'
  const image = avatarUrl
    ? avatarUrl
    : '/anonymous-image.png';

  const user = {
    avatarUrl,
    email,
    name,
  }

  const onSuccessGoogle = response => {
    setAvatarUrl(response.profileObj.imageUrl);
    setEmail(response.profileObj.email);
    setName(response.profileObj.name);
    setFirstName(response.profileObj.givenName);
    setIsLogedIn(true);
  };

  const onFailureGoogle = response => {
    alert('Ops... There was a connection error.');
    console.log(response);
  };

  const onLogoutGoogle = () => {
    setAvatarUrl('');
    setEmail('');
    setName('');
    setFirstName('');
    setIsLogedIn(false);
    alert('Logout done');
  };

  return(
    <div className={styles.newCommentBox}>
      <img src={image} alt="Avatar Image"/>
      <div className={styles.square}></div>
      <form onSubmit={e => onSubmitNewComment(e, comment, user)} className={styles.commentDetails}>
        <div className={styles.nameBox}>
          <h4>{userName}</h4>
        </div>
        <div className={styles.commentArea}>
          <textarea onChange={e => setComment(e.target.value)} autoFocus required className={styles.textArea} placeholder='Text your comment here' />
          <div className={styles.buttonContent}>
            <button type='button' className={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type='submit' className={styles.submitButton}>{submitButton}</button>
            {isLogedIn 
              ? <GoogleLogout
                  clientId="17940802887-ohvi1iv0t9bi0npo26cetochgff4u16e.apps.googleusercontent.com"
                  onLogoutSuccess={onLogoutGoogle}
                  render={renderProps => (
                    <button 
                      onClick={renderProps.onClick} 
                      disabled={renderProps.disabled}
                      className={styles.loginButton}
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
                      className={styles.loginButton}
                      type='button'
                    >Login with Google</button>
                  )}
                />
              }
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewComment;