import React, { useEffect, useState } from "react";
import Router from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import { Bubble } from "@prisma/client";
import DBClient from '../../../prisma/client';
import api from '../../services/api';

import BubbleDetails from "../../components/BubbleDetails/BubbleDetails";

const prisma = DBClient.getInstance().prisma;

export const getStaticPaths: GetStaticPaths = async () => {
  const bubbles = await prisma.bubble.findMany({
    select: {
      id: true
    },
  });
  const paths = bubbles.map((bubble) => ({ params: { id: `${bubble.id}` }}))

  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bubble = await prisma.bubble.findOne({
    include: {
      author: {
        select: {
          avatarUrl: true,
        },
      },
      comments: true,
    },
    where: {
      id: parseInt(params.id as string)
    },
  });

  const serializableBubble = {
    ...bubble,
    createdAt: bubble.createdAt.toDateString(),
    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toDateString(),
    })),
  };
  return { props: { bubble: serializableBubble } };
};

type FilledBubble = Bubble & {
  comments: any[],
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: FilledBubble,
};

const BubblePage: React.FC<Props> = (props: Props) => {
  const [ bubble, setBubble ] = useState<FilledBubble>(props.bubble)

  useEffect(() => {
    const newBubble = {
      ...props.bubble,
      createdAt: new Date(props.bubble.createdAt),

      comments: props.bubble.comments.map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
      })),
    };

    setBubble(newBubble)
  }, []);

  const postComment = async (e, userComment, userInfo) => {
    e.preventDefault();

    const content = userComment;
    const author = userInfo;
    const bubbleId = bubble.id;
  
    try {
      await api.post('/comments', {
        content,
        author,
        bubbleId,
      });
      alert('Comment registered!')
      Router.reload();

    } catch {
      alert('Registration error! Try again');
      Router.reload();
    };
  };

  return(
    <BubbleDetails 
      onClose={() => Router.push('/')} bubble={bubble}
      onSubmitNewComment={postComment}
    />
  );
};

export default BubblePage