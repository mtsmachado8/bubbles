import React from "react";
import { Bubble } from "@prisma/client";

import Modal from "../Modal/Modal";

import styles from './_bubbleDetails.module.css';

type BubbleProps = Bubble & {
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: BubbleProps,
  onClose: any,
  props?: any
};

const BubbleDetails: React.FC<Props> = ({ bubble, onClose, ...props }: Props) => {
  const authorAvatar = bubble?.author?.avatarUrl 
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  return(
    <Modal onClose={onClose}>
      <div className={styles.detailsPage} {...props}>
        <img src={authorAvatar} alt="Avatar"/>
        <div className={styles.square}></div>
        <div className={styles.bubbleDetails}>
          <div className={styles.titleContainer}>
            <h2>{bubble.title}</h2>
            <p>{bubble.description}</p>
          </div>
          <div className={styles.textContent}>
            <div className={styles.typeText}>
              <p>Write</p>
            </div>
            <div className={styles.textArea}>
              <p>{bubble.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BubbleDetails