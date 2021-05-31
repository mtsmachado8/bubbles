import React, { useState } from "react";

import { Bubble, Label, Comment, Like } from "@prisma/client";

import Modal from "../Modal/Modal";
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';
import Labels from "../Labels/Labels";
import styles from './_bubbleDetailsModal.module.css';
import BubbleDetails from "./BubbleDetails/BubbleDetails";

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
  allLabels: Label[];
  onClose: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onSubmitNewComment: Function;
  onSubmitNewLabel: Function;
  onConfigChange: Function;
  alteredLike: (likeId: Number, bubbleId: Number) => void;
};

const BubbleDetailsModal: React.FC<Props> = (props: Props) => {
  const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);

  return(
    <Modal onClose={props.onClose}>
      <div className={styles.content}>
        <section className={styles.detailsContent}>
          <BubbleDetails 
            bubble={props.bubble}
            alteredLike={props.alteredLike}
          />

          <Comments bubble={props.bubble} />

          {isNewCommentVisible
          ? <div className={styles.newComment}>
              <NewComment 
                onClick={() => setIsNewCommentVisible(false)}
                onSubmitNewComment={props.onSubmitNewComment}
              />
            </div>

          : <div className={styles.buttonBox}>
              <button type='button' onClick={() => setIsNewCommentVisible(true)}>Comment</button>
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

export default BubbleDetailsModal