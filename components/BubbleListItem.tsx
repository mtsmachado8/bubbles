import React from "react";
import Image from "next/image"
import { Bubble } from "@prisma/client";

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

const BubbleListItem: React.FC<Props> = ({ bubble, onClick, ...props }: Props) => {
  const authorAvatar = bubble ? bubble.author.avatarUrl : 'https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png';
  return (
    <div onClick={onClick} {...props} style={{border: '1px solid red'}}>
      {authorAvatar && <Image height={'20px'} width={'20px'} src={authorAvatar}/>}
      <h2>{bubble.title}</h2>
      <p>{bubble.description}</p><p/>
    </div>
  );
};

export default BubbleListItem;
