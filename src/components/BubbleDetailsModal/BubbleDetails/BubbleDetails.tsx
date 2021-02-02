import React from "react";

import { Bubble, Label, Comment, Like, ContentBlock } from "@prisma/client";

import Reactions from '../../Reactions/Reactions';

import styles from './_bubbleDetails.module.css';
import Avatar from "../../Avatar/Avatar";
import HtmlContent from "../../RichTextArea/HtmlContent";

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
  content: ContentBlock[];
};

type Props = {
  bubble: FilledBubble;
  alteredLike: Function;
};

const BubbleDetails: React.FC<Props> = ({ bubble, alteredLike }: Props) => {
  const image = bubble.author 
    ? bubble.author.avatarUrl
    : '/anonymous-image.png';

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Avatar
          src={image}
          key={image}
          alt='Author Avatar'
          size={65}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.square}></div>
        <div className={styles.titleContainer}>
          <h2>{bubble.title}</h2>
          <p>{bubble.description}</p>
        </div>
        <div className={styles.textArea}>
          {bubble.content?.map(({ html, tag }, index) => (
            <HtmlContent key={index} html={html} tag={tag}/>
          ))}
          <div className={styles.reactions}>
            <Reactions 
              comments={bubble.comments}
              likes={bubble.likes}
              alteredLike={alteredLike}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BubbleDetails