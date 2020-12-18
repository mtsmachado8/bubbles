import React from 'react';

import { FaRegCommentAlt } from 'react-icons/fa';
import { BiLike, BiDislike } from 'react-icons/bi';

import { Comment } from '@prisma/client';

import styles from './_reactions.module.css';

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  };
};

type Props = {
  comments: FilledComment[];
};

const Reactions: React.FC<Props> = ({comments}: Props) => {
  return(
    <div className={styles.reactions}>
      <div className={styles.comments}>
        <FaRegCommentAlt />
        <p>{comments.length}</p>
      </div>
    </div>
  );
};

export default Reactions;