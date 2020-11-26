import React, { useState } from "react";

import Modal from "../Modal/Modal";
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';

import styles from './_bubbleDetails.module.css';

type Props = {
  bubble: any,
  onClose: Function,
  onSubmitNewComment: Function,
};

const BubbleDetails: React.FC<Props> = ({ bubble, onClose, onSubmitNewComment }: Props) => {
  const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);

  const authorAvatar = bubble.author?.avatarUrl 
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  return(
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <section className={styles.detailsContent}>
          <div className={styles.detailsPage}>
            <img src={authorAvatar} alt="Avatar"/>
            <div className={styles.square}></div>
            <div className={styles.bubbleDetails}>
              <div className={styles.titleContainer}>
                <h2>{bubble.title}</h2>
                <p>{bubble.description}</p>
              </div>
              <div className={styles.textArea}>
                <p>{bubble.content}</p>
              </div>
            </div>
          </div>

          <Comments bubble={bubble} />

          {isNewCommentVisible
          ? <NewComment 
              onClick={() => setIsNewCommentVisible(false)}
              onSubmitNewComment={onSubmitNewComment}
            />

          : <div className={styles.buttonBox}>
              <button type='button' onClick={() => setIsNewCommentVisible(true)}>Comment here</button>
            </div>
          }
        </section>

        <aside className={styles.labelsContent}>

        </aside>
      </div>
    </Modal>
  );
};

export default BubbleDetails