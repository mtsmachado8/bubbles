import React, { useState } from "react";

import { Bubble, Label, Comment } from "@prisma/client";

import Modal from "../Modal/Modal";
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';
import Labels from "../Labels/Labels";
import Image from 'next/image';
import styles from './_bubbleDetailsModal.module.css';
import Avatar from "../Avatar/Avatar";
import BubbleDetails from "./BubbleDetails/BubbleDetails";

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
};

const BubbleDetailsModal: React.FC<Props> = ({ bubble, onClose, onSubmitNewComment, onSubmitNewLabel, allLabels }: Props) => {
  const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);

  const authorAvatar = bubble.author?.avatarUrl 
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  return(
    <Modal onClose={onClose}>
      <div className={styles.content}>
        <section className={styles.detailsContent}>
          <BubbleDetails bubble={bubble}/>

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
          <Labels 
            onSubmitNewLabel={onSubmitNewLabel}
            labels={bubble.labels}
            allLabels={allLabels}
          />
        </aside>
      </div>
    </Modal>
  );
};

export default BubbleDetailsModal