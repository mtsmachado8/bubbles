import React, { useContext, useState } from 'react';
import AuthContext from '../../infra/contexts/AuthContext';
import Avatar from '../Avatar/Avatar';

import styles from './_newComment.module.css';

type Props = {
  id?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmitNewComment: Function;
}

const NewComment: React.FC<Props> = (props: Props) => {
  const [ content, setContent ] = useState('');

  const { 
    loggedUser,
    login,
    logout,
  } = useContext(AuthContext);

  const submitButton = loggedUser ? `Comment with ${loggedUser.name.split(' ')[0]}` : 'Comment Anonymously';
  const userName = loggedUser ? `${loggedUser.name}` : 'Anonymous'
  const image = loggedUser
  ? loggedUser.avatarUrl
  : '/anonymous-image.png';

  const onSubmitNewComment = (content, user, e) => {
    props.onClick(e);
    props.onSubmitNewComment(content, user);
  };

  return(
    <div className={styles.newCommentBox}>
      <div className={styles.image}>
        <Avatar
          alt='User Avatar'
          key={image}
          size={50}
          src={image}
        />
      </div>
      <div className={styles.square}></div>
      <form
        className={styles.commentDetails}
        onSubmit={e => {
          e.preventDefault();
          onSubmitNewComment(content, loggedUser, e);
        }}
      >
        <div className={styles.nameBox}>
          <h4>{userName}</h4>
        </div>
        <div className={styles.commentArea}>
          <textarea onChange={e => setContent(e.target.value)} autoFocus required className={styles.textArea} placeholder='Text your comment here' />
          
          {loggedUser
          ? <div className={styles.buttonContent}>
              <button type='button' className={styles.cancelButton} onClick={props.onClick}>Cancel</button>
              
              <button
                className={styles.logoutButton}
                onClick={logout}
                type='button'
              >Logout</button>

              <button type='submit' className={styles.loginButton}>{submitButton}</button>
            </div>

          : <div className={styles.buttonContent}>
              <button type='button' className={styles.cancelButton} onClick={props.onClick}>Cancel</button>
              <button type='submit' className={styles.submitButton}>{submitButton}</button>
              <button
                className={styles.loginButton}
                onClick={login}
                type='button'
              >Login</button>
            </div>
          }
          
        </div>
      </form>
    </div>
  );
};

export default NewComment;