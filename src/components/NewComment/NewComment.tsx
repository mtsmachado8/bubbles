import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';

import styles from './_newComment.module.css';

type Props = {
  id?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmitNewComment: Function;
}

const NewComment: React.FC<Props> = (props: Props) => {
  const [ isLogedIn, setIsLogedIn ] = useState(false);

  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');

  const [ content, setContent ] = useState('');

  const submitButton = isLogedIn ? `Comment with ${firstName}` : 'Comment Anonymously';
  const userName = isLogedIn ? `${name}` : 'Anonymous'
  const image = avatarUrl
    ? avatarUrl
    : '/anonymous-image.png';

  const user = {
    avatarUrl,
    email,
    name,
  };

  const onSubmitNewComment = (content, user, e) => {
    props.onClick(e);
    props.onSubmitNewComment(content, user);
  };

  const onSuccessGoogle = response => {
    setAvatarUrl(response.profileObj.imageUrl);
    setEmail(response.profileObj.email);
    setName(response.profileObj.name);
    setFirstName(response.profileObj.givenName);
    setIsLogedIn(true);
    toast.dark(`Welcome Mr(s) ${response.profileObj.familyName}`, {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const onFailureGoogle = response => {
    console.log(response);
    toast.error('Ops... There was a connection error', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  const onLogoutGoogle = () => {
    setAvatarUrl('');
    setEmail('');
    setName('');
    setFirstName('');
    setIsLogedIn(false);
    toast.dark('Bye! See you later', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  };

  return(
    <div className={styles.newCommentBox}>
      <img src={image} alt="Avatar Image"/>
      <div className={styles.square}></div>
      <form
        className={styles.commentDetails}
        onSubmit={e => {
          e.preventDefault();
          onSubmitNewComment(content, user, e);
        }}
      >
        <div className={styles.nameBox}>
          <h4>{userName}</h4>
        </div>
        <div className={styles.commentArea}>
          <textarea onChange={e => setContent(e.target.value)} autoFocus required className={styles.textArea} placeholder='Text your comment here' />
          <div className={styles.buttonContent}>
            <button type='button' className={styles.cancelButton} onClick={props.onClick}>Cancel</button>
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