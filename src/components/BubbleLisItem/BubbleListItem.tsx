import React from "react";
import Image from "next/image"
import { Bubble } from "@prisma/client";
import styles from './_bubbleListItem.module.css';

import NoImage from '../../assets/images/no-image.jpg';

type BubbleProps = Bubble & {
  author: {
      avatarUrl: string;
  };
}

type Props = {
  bubble: BubbleProps,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  props?: any
}

// {authorAvatar && <Image height={'20px'} width={'20px'} src={authorAvatar}/>}

const BubbleListItem: React.FC<Props> = ({ bubble, onClick, ...props }: Props) => {
  const authorAvatar = bubble ? bubble.author?.avatarUrl : 'https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png';
  return (
    <div onClick={onClick} {...props} className={styles.bubbleContainer}>
      <div className={styles.title}>
        <h2>{bubble.title}</h2>
        <p>Infraestrutura</p>
      </div>
      <p>{bubble.description}</p>
    </div>
  );
};

export default BubbleListItem;
