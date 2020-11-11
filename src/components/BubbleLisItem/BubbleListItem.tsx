import React from "react";
import { Bubble } from "@prisma/client";
import styles from './_bubbleListItem.module.css';

type BubbleProps = Bubble & {
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: BubbleProps,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  props?: any
};

const BubbleListItem: React.FC<Props> = ({ bubble, onClick, ...props }: Props) => {
  function Avatar() {
    const avatar = bubble.author?.avatarUrl;
  
    if(avatar == null) {
      return 'https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png'
    };
  };

  const authorAvatar = Avatar();

  return (
    <div onClick={onClick} {...props} className={styles.bubbleContainer}>
      <img src={authorAvatar} className={styles.image} />
      <div className={styles.textContent}>
        <div className={styles.title}>
          <h2>{bubble.title}</h2>
          <p>{bubble.content}</p>
        </div>
        <p className={styles.description}>{bubble.description}</p>
        <p className={styles.date}>{bubble.createdAt}</p>
      </div>
    </div>
  );
};

export default BubbleListItem;
