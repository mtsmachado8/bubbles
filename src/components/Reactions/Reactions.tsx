import React, { useContext, useEffect, useState } from 'react';

import { FaRegCommentAlt } from 'react-icons/fa';
import { BiLike, BiDislike } from 'react-icons/bi';

import AuthContext from '../../infra/contexts/AuthContext';
import { Comment, Like } from '@prisma/client';

import styles from './_reactions.module.css';

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

type Props = {
  comments: FilledComment[];
  likes: FilledLike[];
  onSubmitNewLike: Function;
};

const Reactions: React.FC<Props> = (props: Props) => {
  const { loggedUser } = useContext(AuthContext);
  const [ alreadyLiked, setAlreadyLiked ] = useState(undefined);

  const likes = props.likes ? props.likes.length : 0;

  useEffect(() => {
    if(loggedUser) {
      setAlreadyLiked(
        props.likes.find(like => like.author.email === loggedUser?.email)
      );
    };
  }, [props.likes, loggedUser])

  return(
    <div className={styles.reactions}>
      <div 
        className={styles.actions}
        onClick={e => {
          e.preventDefault();
          props.onSubmitNewLike(alreadyLiked ? alreadyLiked.id : null);
        }}
      >
        <BiLike className={alreadyLiked ? styles.unliked : styles.liked} />
        <p className={alreadyLiked ? styles.unliked : styles.liked}>{likes}</p>
      </div>

      <div className={styles.comments}>
        <FaRegCommentAlt />
        <p>{props.comments.length}</p>
      </div>
    </div>
  );
};

export default Reactions;