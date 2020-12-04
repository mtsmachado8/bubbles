import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { toast } from 'react-toastify';
import Router from "next/router";

import { Bubble, Label, Comment } from "@prisma/client";
import prisma from '../../../prisma/client';
import api from '../../services/api';

import BubbleDetails from "../../components/BubbleDetails/BubbleDetails";

import postComments from '../../services/postComments';
import postLabels from '../../services/postLabels';
import alteredLabels from '../../services/alteredLabels';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

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
  const bubble = await prisma.bubble.findUnique({
    include: {
      labels: true,
      comments: {
        include: {
          author: {
            select: {
              avatarUrl: true,
              name: true,
            },
          },
        },
      },
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

  const labels = await prisma.label.findMany()

  const serializableBubble = {
    ...bubble,
    createdAt: bubble.createdAt.toString(),

    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toString(),
    })),
  };
  
  return { props: { bubble: serializableBubble, labels } };
};

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  }
}

type FilledBubble = Bubble & {
  labels: Label[],
  comments: FilledComment[],
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: FilledBubble,
  labels: Label[];
};

const BubblePage: React.FC<Props> = (props: Props) => {
  const [ bubble, setBubble ] = useState<FilledBubble>(props.bubble)

  useEffect(() => {
    setBubble({
      ...props.bubble,
      createdAt: new Date(props.bubble.createdAt),
    });
  }, []);

  const postComment = (e, newComment, userInfo) => {
    postComments(e, newComment, userInfo, bubble.id);
  };

  const postLabel = (e, newLabel) => {
    postLabels(e, newLabel, bubble.id);
  };

  const alteredLabel = (e, id, selectedLabel) => {
    alteredLabels(e, id , selectedLabel, bubble.id);
  };

  return(
    <BubbleDetails 
      onClose={() => Router.push('/')}
      bubble={bubble}
      allLabels={props.labels}
      onSubmitNewComment={postComment}
      onSubmitNewLabel={postLabel}
      onConfigChange={alteredLabel}
    />
  );
};

export default BubblePage