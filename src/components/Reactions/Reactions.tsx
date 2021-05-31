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
  alteredLike: (likeId: Number) => void;
};

const Reactions: React.FC<Props> = (props: Props) => {
  const { loggedUser } = useContext(AuthContext);
  const [ alreadyLiked, setAlreadyLiked ] = useState(false);
  const [ like, setLike ] = useState(null);

  const likes = props.likes ? props.likes.length : 0;

  useEffect(() => {
    if(loggedUser) {
      setAlreadyLiked(
        props.likes.some(like => like.author.email === loggedUser?.email)
      );
        
      setLike(
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
          props.alteredLike(like?.id);
        }}
      >
        <BiLike className={alreadyLiked ? styles.unlike : styles.like} />
        <p className={alreadyLiked ? styles.unlike : styles.like}>{likes}</p>
      </div>

      <div className={styles.comments}>
        <FaRegCommentAlt />
        <p>{props.comments.length}</p>
      </div>
    </div>
  );
};

export default Reactions;