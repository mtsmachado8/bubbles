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
        <div className={styles.bubbleDetails}>
          <div className={styles.titleContainer}>
            <h2>{bubble.title}</h2>
            <p>{bubble.description}</p>
          </div>
          
        </div>
      </div>
    </Modal>
  );
};

export default BubbleDetails