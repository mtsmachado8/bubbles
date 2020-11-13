import React from "react";
import { Bubble, Label } from "@prisma/client";
import styles from './_bubbleListItem.module.css';

type BubbleProps = Bubble & {
  labels: Array<Label>;
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
  const authorAvatar = bubble?.author?.avatarUrl 
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  const label = bubble?.labels
    ? bubble.labels[0]
    : 'Sem categoria';

  return (
    <div onClick={onClick} {...props} className={styles.bubbleContainer}>
      <img src={authorAvatar} className={styles.image} />
      <div className={styles.textContent}>
        <div className={styles.title}>
          <h2>{bubble.title}</h2>
          <p>{label}</p>
        </div>
        <div className={styles.description}>
          <p>{bubble.description}</p>
        </div>
        <p className={styles.date}>{bubble.createdAt}</p>
      </div>
    </div>
  );
};

export default BubbleListItem;
