import React from "react";

import Modal from "../Modal/Modal";

import noImage from '../../../public/anonymous-image.png';

import styles from './_newBubbleModal.module.css';

type Props = {
  onClose: any;
  onSubmitNewBubble: any;
};

const BubbleDetails: React.FC<Props> = ({ onClose, onSubmitNewBubble }: Props) => {  
  const placeholder = 'Tell us:\n\n1 - What is the problem?\n2 - How to fix?\n3 - What are the possible problems after fix it?'
  
  return(
    <Modal onClose={onClose}>
      <div className={styles.newBubblePage}>
        <img src={noImage} alt="Avatar"/>
        <div className={styles.square}></div>
        <form onSubmit={onSubmitNewBubble} className={styles.newBubbleDetails}>
          <div className={styles.titleContainer}>
            <input name='title' placeholder="Title" />
            <input name='description' placeholder="Brief description about the bubble"/>
          </div>
          <div className={styles.textContent}>
            <div className={styles.typeText}>
              <p>Write</p>
            </div>
            <textarea name='content' className={styles.textArea} placeholder={placeholder} />
            <div className={styles.buttonContent}>
              <button type="submit" className={styles.anonymous}>Submit Anonymously</button>
              <button type="submit">Login with google</button>
            </div>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default BubbleDetails