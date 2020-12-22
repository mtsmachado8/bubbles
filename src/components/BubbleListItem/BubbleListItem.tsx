import React from "react";
import { Bubble, Label, Comment, Like } from "@prisma/client";
import { format } from 'date-fns';

import styles from './_bubbleListItem.module.css';
import Reactions from "../Reactions/Reactions";

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  };
};

type FilledLike = Like & {
  author: {
    email: string;
  };
};

type FilledBubble = Bubble & {
  labels: Label[];
  likes: FilledLike[];
  comments: FilledComment[];
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: FilledBubble;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  alteredLike: Function;
};

const BubbleListItem: React.FC<Props> = ({ bubble, onClick, alteredLike }: Props) => {
  const authorAvatar = bubble.author?.avatarUrl
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  const newLabelsArray = bubble.labels?.slice(0, 3);

  return (
    <div onClick={onClick} className={styles.bubbleContainer}>
      <img src={authorAvatar} alt="Avatar" />
      <div className={styles.textContent}>
        <div className={styles.title}>
          <h2>{bubble.title}</h2>
          <div className={styles.labels}>
            {newLabelsArray.map(label => (
              <p key={label.id} style={{backgroundColor: label.color}}>{label.name}</p>
            ))}
          </div>
        </div>
        <div className={styles.description}>
          <p>{bubble.description}</p>
        </div>
        <div className={styles.reactions}>
          <Reactions
            comments={bubble.comments}
            likes={bubble.likes}
            alteredLike={alteredLike}
          />
          <p className={styles.date}>{format(new Date(bubble.createdAt), 'dd/MM/yyyy')}</p>
        </div>
      </div>
    </div>
  );
};

export default BubbleListItem;
