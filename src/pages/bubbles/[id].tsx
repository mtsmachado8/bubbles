import React, { useContext, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";

import {  Label, User } from "@prisma/client";
import prisma from '../../../prisma/client';

import BubbleDetailsModal from "../../components/BubbleDetailsModal/BubbleDetailsModal";

import alteredLabels from '../../infra/services/alteredLabels';
import postComments from '../../infra/services/postComments';
import postLabels from '../../infra/services/postLabels';
import useFetch from "../../infra/hooks/swr";
import { getById as getBubbleById } from "../api/bubbles/_repository";
import { getAll as getAllLabels } from "../api/labels/_repository";
import { getAll as getAllUsers } from '../api/users/_repository';
import alteredLikes from "../../infra/services/alteredLikes";
import AuthContext from "../../infra/contexts/AuthContext";
import alteredChampions from "../../infra/services/alteredChampion";
import { FilledBubble } from "../../infra/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const bubbles = await prisma.bubble.findMany({
    select: {
      id: true,
    },
  });
  const paths = bubbles.map((bubble) => ({ params: { id: `${bubble.id}` }}));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bubble = await getBubbleById(params.id as string);
  const users = await getAllUsers();
  const labels = await getAllLabels();
  
  return { 
    props: { 
      initialBubbleData: bubble,
      initialLabelsData: labels,
      initialAllUsersData: users,
    },
    revalidate: 1
  };
};

type Props = {
  initialBubbleData: FilledBubble;
  initialLabelsData: Label[];
  initialAllUsersData: User[];
};

const BubblePage: React.FC<Props> = (props: Props) => {
  const [ bubble, setBubble ] = useState<FilledBubble>(props.initialBubbleData)
  const [ labels, setLabels ] = useState<Label[]>(props.initialLabelsData)
  const [ users ]  = useState<User[]>(props.initialAllUsersData)

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

  const alteredChampion = (bubbleId, userId, isSelectedChampion) => {
    alteredChampions(bubbleId, userId, isSelectedChampion);
  };

  const alteredLike = (id) => {
    alteredLikes(bubble.id, loggedUser, id)
  }

  return(
    <BubbleDetailsModal
      champions={bubble.champions}
      allUsers={users}
      onClose={() => Router.push('/')}
      bubble={bubble}
      allLabels={labels}
      onSubmitNewComment={postComment}
      onSubmitNewLabel={postLabel}
      onSubmitNewChampion={() => {}}
      onConfigLabelChange={alteredChampion}
      onConfigChampionChange={alteredChampion}
      alteredLike={alteredLike}
    />
  );
};

export default BubblePage;