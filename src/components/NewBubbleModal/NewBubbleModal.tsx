import React, { useContext, useState } from 'react';
import AuthContext from '../../infra/contexts/AuthContext';
import { uid } from '../../infra/helpers';
import Avatar from '../Avatar/Avatar';

import Modal from '../Modal/Modal';
import RichTextArea from '../RichTextArea/RichTextArea';

import styles from './_newBubbleModal.module.css';

type Props = {
  onClose: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onSubmitNewBubble: Function;
};

const BubbleDetails: React.FC<Props> = ({ onClose, onSubmitNewBubble }: Props) => {
  const { 
    loggedUser,
    login,
    logout,
  } = useContext(AuthContext);
  
  const [ description, setDescription ] = useState('');
  const [ blocks, setBlocks ] = useState([
    { id: uid(), html: "The problem", tag: "h2", placeholder: 'Heading 1' },
    { id: uid(), html: "Your proposal for fixing it", tag: "h2", placeholder: 'Heading 1' },
    { id: uid(), html: "Alternative ways for fixing it", tag: "h2", placeholder: 'Heading 1' },
  ]);
  const [ title, setTitle ] = useState('');

  const submitButton = loggedUser ? `Submit with ${loggedUser.name.split(' ')[0]}` : 'Submit Anonymously';
  const image = loggedUser
    ? loggedUser?.avatarUrl
    : '/anonymous-image.png';

  const bubble = {
    description,
    content: blocks,
    title,
  };

  return(
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <section className={styles.newBubblePage}>
          <div className={styles.image}>
            <Avatar 
              alt='User Avatar'
              key={image}
              size={80}
              src={image}
            />
          </div>
          <div className={styles.square}></div>
          <form
            className={styles.newBubbleDetails}
            onSubmit={e => {
              e.preventDefault();
              onSubmitNewBubble(bubble, loggedUser);
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
              <div className={styles.textArea}>
                <RichTextArea
                  blocks={blocks}
                  setBlocks={setBlocks}
                />
              </div>
              {loggedUser
              ? <div className={styles.buttonContent}>
                  <button 
                    className={styles.logout}
                    onClick={logout} 
                    type='button'
                  >Logout</button>

                  <button type='submit'>{submitButton}</button>
                </div>

              : <div className={styles.buttonContent}>
                  <button type='submit' className={styles.submit}>{submitButton}</button>

                  <button
                    onClick={login}
                    type='button'
                  >Login</button>
                </div>
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
