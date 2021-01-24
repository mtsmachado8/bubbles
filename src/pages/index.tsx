import React, { useContext, useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Router from "next/router";
import Link from 'next/link';

import { getAll as getAllBubbles } from './api/bubbles/_repository';
import { getAll as getAllLabels } from './api/labels/_repository';
import { Bubble, Label, Comment, Like } from "@prisma/client";
import AuthContext from "../infra/contexts/AuthContext";
import useFetch from "../infra/hooks/swr";

import BubbleDetailsModal from "../components/BubbleDetailsModal/BubbleDetailsModal";
import BubbleListItem from "../components/BubbleListItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';
import NewBubbleModal from "../components/NewBubbleModal/NewBubbleModal";
import AsideHome from "../components/AsideHome/AsideHome";
import Header from '../components/Header/Header';

import alteredLabels from '../infra/services/alteredLabels';
import alteredLikes from '../infra/services/alteredLikes';
import postComments from '../infra/services/postComments';
import postBubble from '../infra/services/postBubble';
import postLabels from '../infra/services/postLabels';

import styles from './_home.module.css';

export const getStaticProps: GetStaticProps = async () => {
  const bubbles = await getAllBubbles();
  const labels = await getAllLabels();

  return {
    props: {
      initialBubblesData: bubbles,
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
  comments: FilledComment[];
  likes: FilledLike[];
  author: {
      avatarUrl: string;
  };
};

type Props = {
  initialBubblesData: FilledBubble[];
  initialLabelsData: Label[];
};

const HomePage: NextPage<Props> = ( props: Props ) => {
  const [ bubbles, setBubbles ] = useState<FilledBubble[]>(props.initialBubblesData);
  const [ labels, setLabels ] = useState<Label[]>(props.initialLabelsData);

  const [ isNewBubbleModalVisible, setIsNewBubbleModalVisible ] = useState(false);
  const [ isBubbleDetailsVisible, setIsBubbleDetailsVisible ] = useState(false);
  
  const [ oppenedBubbleId, setOppenedBubbleId ] = useState(null);

  const { data: bubblesData } = useFetch('/bubbles');
  const { data: labelsData } = useFetch('/labels');

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    if(bubblesData != undefined) {
      setBubbles(bubblesData.map(bubble => ({
        ...bubble,
        createdAt: new Date(bubble.createdAt),
      })));
    };

    if(labelsData != undefined) {
      setLabels(labelsData);
    };

  }, [bubblesData, labelsData]);

  const postBubbleHandler = (bubblInfo, userInfo) => {
    postBubble(bubblInfo, userInfo);
    Router.push('/');
    setIsNewBubbleModalVisible(false);
  };

  const postComment = (newComment, userInfo) => {
    postComments(newComment, userInfo, oppenedBubbleId);
  };

  const postLabel = (newLabel) => {
    postLabels(newLabel, oppenedBubbleId);
  };

  const alteredLabel = (id, selectedLabel) => {
    alteredLabels(id , selectedLabel, oppenedBubbleId);
  };

  const alteredLike = (id) => {
    alteredLikes(oppenedBubbleId, loggedUser, id);
  };

  return (
    <div className={styles.homePage}>
      <main className={styles.container}>
        <div className={styles.bubblesContainer}>
          <Header/>

          {bubbles.map((bubble) => (
            <div key={bubble.id}>
              <Link href={`/?[id]=${bubble.id}`} as={`/bubbles/${bubble.id}`}>
                <BubbleListItem
                  onClick={() => {
                    setIsBubbleDetailsVisible(true);
                    setOppenedBubbleId(bubble.id)}
                  }
                  bubble={bubble}
                  alteredLike={alteredLike}
                />
              </Link>

              {isBubbleDetailsVisible && bubble.id === oppenedBubbleId ?
                <BubbleDetailsModal
                  onClose={() => {setIsBubbleDetailsVisible(false); Router.push('/'); setOppenedBubbleId(null)}}
                  bubble={bubble}
                  allLabels={labels}
                  onSubmitNewLabel={postLabel}
                  onConfigChange={alteredLabel}
                  onSubmitNewComment={postComment}
                  alteredLike={alteredLike}
                />
              : null}
            </div>
          ))}

        </div>

        <Link href='/' as='/bubbles/new'>
          <FloatingButton 
            onClick={() => setIsNewBubbleModalVisible(true)} 
            isVisible={!isNewBubbleModalVisible && !isBubbleDetailsVisible}
          />
        </Link>

        {isNewBubbleModalVisible ?
          <NewBubbleModal
            onClose={() => {setIsNewBubbleModalVisible(false); Router.push('/')}}
            onSubmitNewBubble={postBubbleHandler}
          />
        : null}

      </main>
      <aside className={styles.menu}>
        <AsideHome />
      </aside>
    </div>
  );
};

export default HomePage;