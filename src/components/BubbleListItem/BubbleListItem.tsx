import React from "react";
import { Bubble, Label } from "@prisma/client";
import styles from './_bubbleListItem.module.css';
import Avatar from '../Avatar/Avatar'

type BubbleProps = Bubble & {
  labels: Array<Label>;
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: BubbleProps,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
};

const BubbleListItem: React.FC<Props> = ({ bubble, onClick }: Props) => {
  const authorAvatar = bubble.author?.avatarUrl
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  const newLabelsArray = bubble.labels?.slice(0, 3);

  return (
    <div onClick={onClick} className={styles.bubbleContainer}>
      <Avatar
        src={authorAvatar}
        alt='User Avatar'
        size={50}
      />
      <div className={styles.textContent}>
        <div className={styles.title}>
          <h2>{bubble.title}</h2>
          <div className={styles.labels}>
          {newLabelsArray.map(label => (
              <p>{label.name}</p>
          ))}
          </div>
        </div>
        <div className={styles.description}>
          <p>{bubble.description}</p>
        </div>
        <p className={styles.date}>{bubble.createdAt.toLocaleDateString('pt-br')}</p>
      </div>
    </div>
  );
};

export default BubbleListItem;
