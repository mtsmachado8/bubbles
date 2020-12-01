import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { Bubble, Comment, Label } from '@prisma/client';

import styles from './_comments.module.css';

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  };
};

type FilledBubble = Bubble & {
  labels: Label[],
  comments: FilledComment[],
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: FilledBubble,
};

const Comments: React.FC<Props> = ({ bubble }: Props) => {
  return(
    <div className={styles.commentSpace}>

      <div className={styles.alreadyCommented}>
        {bubble.comments.map(comment => (
          <div className={styles.cardBox} key={comment.id} >

            <img 
              src={comment.author?.avatarUrl
              ? comment.author.avatarUrl
              : '/anonymous-image.png'} 
              alt='Avatar Image'
            />

            <div className={styles.square}></div>
            <div className={styles.commentDetail}>
              <div className={styles.nameBox}>

                <h4>
                  {comment.author?.name 
                    ? comment.author.name
                    : 'Anonymous'
                  }
                </h4>

                <p>
                  Commented {
                    formatDistanceToNow(
                      parseISO(
                        new Date(comment.createdAt)
                        .toISOString()
                      )
                    )
                  } ago
                </p>
              </div>
              <div className={styles.commentText}>
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;