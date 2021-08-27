import React, { useState } from "react";

import {  Label, User } from "@prisma/client";

import Modal from "../Modal/Modal";
import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';
import Labels from "../Labels/Labels";
import styles from './_bubbleDetailsModal.module.css';
import BubbleDetails from "./BubbleDetails/BubbleDetails";
import Champions from "../Champions/Champions"
import { FilledBubble, FilledChampion } from "../../infra/types";


type Props = {
  champions: FilledChampion[];
  allUsers: User[];
  bubble: FilledBubble;
  allLabels: Label[];
  onSubmitNewChampion: Function;
  onClose: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  onSubmitNewComment: Function;
  onSubmitNewLabel: Function;
  onConfigLabelChange: Function;
  onConfigChampionChange: Function;
  alteredLike: (likeId: Number, bubbleId: Number) => void;
};

const BubbleDetailsModal: React.FC<Props> = (props: Props) => {
  const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);

  return (
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

        <aside className={styles.toolsContent}>
          <Labels
            onSubmitNewLabel={props.onSubmitNewLabel}
            labels={props.bubble.labels}
            allLabels={props.allLabels}
            onConfigChange={props.onConfigLabelChange}
          />
          <Champions
            onSubmitNewChampion={props.onSubmitNewChampion}
            bubble={props.bubble}
            champions={props.champions}
            allUsers={props.allUsers}
            onConfigChange={props.onConfigChampionChange}
          />
        </aside>
      </div>
    </Modal>
  );
};

export default BubbleDetailsModal