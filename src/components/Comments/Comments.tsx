import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import styles from './_comments.module.css';
import Avatar from '../Avatar/Avatar';
import { FilledBubble } from '../../infra/types';

type Props = {
  bubble: FilledBubble,
};

const Comments: React.FC<Props> = ({ bubble }: Props) => {
  return(
    <div className={styles.commentSpace}>

      <div className={styles.alreadyCommented}>
        {bubble.comments.map(comment => (
          <div className={styles.cardBox} key={comment.id} >
            <div className={styles.image}>
              <Avatar
                src={comment.author?.avatarUrl
                  ? comment.author.avatarUrl
                  : '/anonymous-image.png'}
                key={comment.author?.avatarUrl}
                alt='Author Avatar'
                size={50}
              />
            </div>

            <div className={styles.commentDetail}>
              <div className={styles.square}/>
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