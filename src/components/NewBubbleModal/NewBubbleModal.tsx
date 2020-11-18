import React, { FormEvent } from "react";

import { PrismaClient } from '@prisma/client';

import Modal from "../Modal/Modal";

import noImage from '../../../public/anonymous-image.png';

import styles from './_newBubbleModal.module.css';

type Props = {
  onClose: any;
};

const BubbleDetails: React.FC<Props> = ({ onClose }: Props) => {
  const placeholder = `Tell us:

  1 - What is the problem?
  2 - How to fix?
  3 - What are the possible problems after fix it?`

  return(
    <Modal onClose={onClose}>
      <div className={styles.newBubblePage}>
        <img src={noImage} alt="Avatar"/>
        <div className={styles.square}></div>
        <form onSubmit={() => console.log('submited')} className={styles.newBubbleDetails}>
          <div className={styles.titleContainer}>
            <input placeholder="Title" />
            <input placeholder="Brief description about the bubble"/>
          </div>
          <div className={styles.textContent}>
            <div className={styles.typeText}>
              <p>Write</p>
            </div>
            <textarea className={styles.textArea} placeholder={placeholder} />
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