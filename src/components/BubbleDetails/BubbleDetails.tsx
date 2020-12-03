import React, { useState } from "react";

import { Bubble, Label, Comment } from "@prisma/client";

import Modal from "../Modal/Modal";
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';
import Labels from "../Labels/Labels";

import styles from './_bubbleDetails.module.css';

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
  allLabels: Label[];
  onClose: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onSubmitNewComment: Function;
  onSubmitNewLabel: Function;
  onConfigChange: Function;
};

const BubbleDetails: React.FC<Props> = ( props: Props ) => {
  const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);

  const authorAvatar = props.bubble.author?.avatarUrl 
    ? props.bubble.author.avatarUrl
    : '/anonymous-image.png';

  return(
    <Modal onClose={props.onClose}>
      <div className={styles.content}>
        <section className={styles.detailsContent}>
          <div className={styles.detailsPage}>
            <img src={authorAvatar} alt="Avatar"/>
            <div className={styles.square}></div>
            <div className={styles.bubbleDetails}>
              <div className={styles.titleContainer}>
                <h2>{props.bubble.title}</h2>
                <p>{props.bubble.description}</p>
              </div>
              <div className={styles.textArea}>
                <p>{props.bubble.content}</p>
              </div>
            </div>
          </div>

          <Comments bubble={props.bubble} />

          {isNewCommentVisible
          ? <NewComment 
              onClick={() => setIsNewCommentVisible(false)}
              onSubmitNewComment={props.onSubmitNewComment}
            />

          : <div className={styles.buttonBox}>
              <button type='button' onClick={() => setIsNewCommentVisible(true)}>Comment here</button>
            </div>
          }
        </section>

        <aside className={styles.labelsContent}>
          <Labels 
            onSubmitNewLabel={props.onSubmitNewLabel}
            labels={props.bubble.labels}
            allLabels={props.allLabels}
            onConfigChange={props.onConfigChange}
          />
        </aside>
      </div>
    </Modal>
  );
};

export default BubbleDetails