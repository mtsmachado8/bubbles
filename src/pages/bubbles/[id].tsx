import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";

import { Bubble, Label, Comment } from "@prisma/client";
import prisma from '../../../prisma/client';

import BubbleDetailsModal from "../../components/BubbleDetailsModal/BubbleDetailsModal";

import postComments from '../../services/postComments';
import postLabels from '../../services/postLabels';
import alteredLabels from '../../services/alteredLabels';

export const getStaticPaths: GetStaticPaths = async () => {
  const bubbles = await prisma.bubble.findMany({
    select: {
      id: true,
    },
  });
  const paths = bubbles.map((bubble) => ({ params: { id: `${bubble.id}` }}));

  return { paths, fallback: false };
};

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

  const labels = await prisma.label.findMany();

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

  const postComment = (newComment, userInfo) => {
    postComments(newComment, userInfo, bubble.id);
  };

  const postLabel = newLabel => {
    postLabels(newLabel, bubble.id);
  };

  const alteredLabel = (id,selectedLabel) => {
    alteredLabels(id, selectedLabel, bubble.id);
  };

  return(
    <BubbleDetailsModal
      onClose={() => Router.push('/')}
      bubble={bubble}
      allLabels={props.labels}
      onSubmitNewComment={postComment}
      onSubmitNewLabel={postLabel}
      onConfigChange={alteredLabel}
    />
  );
};

export default BubblePage;