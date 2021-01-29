import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { Bubble, Comment, ContentBlock, Label, Like } from '@prisma/client';

import styles from './_comments.module.css';
import Avatar from '../Avatar/Avatar';
import HtmlContent from '../RichTextArea/HtmlContent';

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  };
  content: ContentBlock[]
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
              {comment.content?.map(({ html, tag }, index) => (
                <HtmlContent key={index} html={html} tag={tag}/>
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;