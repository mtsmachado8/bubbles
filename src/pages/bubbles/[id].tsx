import React, { useContext, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";

import { Bubble, Label, Comment, Like } from "@prisma/client";
import prisma from '../../../prisma/client';

import BubbleDetailsModal from "../../components/BubbleDetailsModal/BubbleDetailsModal";

import alteredLabels from '../../infra/services/alteredLabels';
import postComments from '../../infra/services/postComments';
import postLabels from '../../infra/services/postLabels';
import useFetch from "../../infra/hooks/swr";
import { getById as getBubbleById } from "../api/bubbles/_repository";
import { getAll as getAllLabels } from "../api/labels/_repository";
import alteredLikes from "../../infra/services/alteredLikes";
import AuthContext from "../../infra/contexts/AuthContext";

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
  const bubble = await getBubbleById(params.id as string);
  const labels = await getAllLabels();
  
  return { 
    props: { 
      initialBubbleData: bubble,
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

  const { loggedUser } = useContext(AuthContext);

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
  }, [bubbleData, labelsData]);

  const postComment = (newComment, userInfo) => {
    postComments(newComment, userInfo, bubble.id);
  };

  const postLabel = newLabel => {
    postLabels(newLabel, bubble.id);
  };

  const alteredLabel = (id,selectedLabel) => {
    alteredLabels(id, selectedLabel, bubble.id);
  };

  const alteredLike = (id) => {
    alteredLikes(bubble.id, loggedUser, id)
  }

  return(
    <BubbleDetailsModal
      onClose={() => Router.push('/')}
      bubble={bubble}
      allLabels={labels}
      onSubmitNewComment={postComment}
      onSubmitNewLabel={postLabel}
      onConfigChange={alteredLabel}
      alteredLike={alteredLike}
    />
  );
};

export default BubblePage;