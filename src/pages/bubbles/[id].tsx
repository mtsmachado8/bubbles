import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";

import { Bubble, Label, Comment } from "@prisma/client";
import prisma from '../../../prisma/client';

import BubbleDetailsModal from "../../components/BubbleDetailsModal/BubbleDetailsModal";

import alteredLabels from '../../services/alteredLabels';
import postComments from '../../services/postComments';
import postLabels from '../../services/postLabels';
import useFetch from "../../hooks/swr";

export const getStaticPaths: GetStaticPaths = async () => {
  const bubbles = await prisma.bubble.findMany({
    select: {
      id: true,
    },
  });
  const paths = bubbles.map((bubble) => ({ params: { id: `${bubble.id}` }}));

  return { paths, fallback: true };
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
  
  return { 
    props: { 
      initialBubbleData: serializableBubble,
      initialLabelsData: labels,
    }, 
  };
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
  initialBubbleData: FilledBubble;
  initialLabelsData: Label[];
};

const BubblePage: React.FC<Props> = (props: Props) => {
  const [ bubble, setBubble ] = useState<FilledBubble>(props.initialBubbleData)
  const [ labels, setLabels ] = useState<Label[]>(props.initialLabelsData)

  const { data: bubbleData } = useFetch(`/bubbles/${props.initialBubbleData.id}`);
  const { data: labelsData } = useFetch('/labels');

  useEffect(() => {
    if (bubbleData != undefined) {
      setBubble({
        ...bubbleData,
        createdAt: new Date(bubbleData.createdAt),
      });
    };

    if(labelsData != undefined) {
      setLabels(labelsData);
    };
  }, [bubbleData, labelsData, labels]);

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
      allLabels={labels}
      onSubmitNewComment={postComment}
      onSubmitNewLabel={postLabel}
      onConfigChange={alteredLabel}
    />
  );
};

export default BubblePage;