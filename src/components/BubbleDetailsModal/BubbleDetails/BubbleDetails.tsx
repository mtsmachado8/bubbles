import React, { useState } from "react";

import { Bubble, Label, Comment } from "@prisma/client";

import Modal from "../Modal/Modal";
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';
import Labels from "../Labels/Labels";
import Image from 'next/image';
import styles from './_bubbleDetails.module.css';
import Avatar from "../../Avatar/Avatar";

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  };
};

type FilledBubble = Bubble & {
  labels: Label[];
  comments: FilledComment[];
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: FilledBubble;
};

const BubbleDetails: React.FC<Props> = ({ bubble }: Props) => {
  const authorAvatar = bubble.author?.avatarUrl 
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  return (
    <div className={styles.container}>
      <Avatar
        src={authorAvatar}
        alt='Author Avatar'
        size={60}
      />
      <div className={styles.details}>
        <div className={styles.square}></div>
        <div className={styles.titleContainer}>
          <h2>{bubble.title}</h2>
          <p>{bubble.description}</p>
        </div>
        <div className={styles.textArea}>
          <p>{bubble.content}</p>
        </div>
      </div>
    </div>
  )
}

export default BubbleDetails