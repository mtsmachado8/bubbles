import React from "react";
import { Bubble, Label, Comment, Like } from "@prisma/client";
import { format } from 'date-fns';

import styles from './_bubbleListItem.module.css';
import Reactions from "../Reactions/Reactions";
import Avatar from "../Avatar/Avatar";

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
  alteredLike: (likeId: Number, bubbleId: Number) => void;
};

const BubbleListItem: React.FC<Props> = ({ bubble, onClick, alteredLike }: Props) => {
  const image = bubble.author?.avatarUrl
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  const newLabelsArray = bubble.labels?.slice(0, 3);

  return (
    <div onClick={onClick} className={styles.bubbleContainer}>
      <div className={styles.image}>
        <Avatar 
          alt='User Avatar'
          key={image}
          size={50}
          src={image}
        />
      </div>
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
            alteredLike={(likeId) => alteredLike(likeId, bubble.id)}
          />
          <p className={styles.date}>{format(new Date(bubble.createdAt), 'dd/MM/yyyy')}</p>
        </div>
      </div>
    </div>
  );
};

export default BubbleListItem;
