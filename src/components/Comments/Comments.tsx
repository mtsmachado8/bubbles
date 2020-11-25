import React from 'react';

import styles from './_comments.module.css';

type Props = {
  bubble: any;
}

const Comments: React.FC<Props> = ({ bubble }: Props) => {
  return(
    <div className={styles.commentSpace}>

      <div className={styles.alreadyCommented}>
        {bubble.comments?.map(comment => (
          <div className={styles.cardBox}>

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

                <p>{comment.createdAt}</p>
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