import React from "react";
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
    },
    where: {
      id: parseInt(params.id as string)
    },
  });

  const serializableBubble = {
    ...bubble,
    createdAt: bubble.createdAt.toDateString(),
  }
  return { props: { bubble: serializableBubble } }
}

type BubbleProps = Bubble & {
  comments: [],
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: BubbleProps,
};

const BubblePage: React.FC<Props> = ({ bubble }: Props) => {
  const postComment = async (e, userComment, userInfo) => {
    e.preventDefault();

    const comment = userComment;
    const author = userInfo;
    const bubbleId = bubble.id;
  
    try {
      await api.post('/bubbles', {
        comment,
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