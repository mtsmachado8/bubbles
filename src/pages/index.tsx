import React, { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Router from "next/router";
import Link from 'next/link';

import { getAll as getAllBubbles } from './api/bubbles/_repository';
import { getAll as getAllLabels } from './api/labels/_repository';
import { Bubble, Label, Comment } from "@prisma/client";
import useFetch from "../hooks/swr";

import BubbleDetailsModal from "../components/BubbleDetailsModal/BubbleDetailsModal";
import BubbleListItem from "../components/BubbleListItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';
import NewBubbleModal from "../components/NewBubbleModal/NewBubbleModal";
import Header from '../components/Header/Header';

import alteredLabels from '../services/alteredLabels';
import postComments from '../services/postComments';
import postBubbles from '../services/postBubbles';
import postLabels from '../services/postLabels';

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

type FilledBubble = Bubble & {
  labels: Label[];
  comments: FilledComment[];
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

  const postBubble = (bubblInfo, userInfo) => {
    postBubbles(bubblInfo, userInfo);
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

  return (
    <div className={styles.homePage}>
      <main className={styles.container}>
        <Header/>

        <div className={styles.bubblesContainer}>

          {bubbles.map((bubble) => (
            <div key={bubble.id}>
              <Link href={`/?[id]=${bubble.id}`} as={`/bubbles/${bubble.id}`}>
                <BubbleListItem
                  onClick={() => {
                    setIsBubbleDetailsVisible(true);
                    setOppenedBubbleId(bubble.id)}
                  }
                  bubble={bubble}
                />
              </Link>

              {isBubbleDetailsVisible && bubble.id === oppenedBubbleId ?
                <BubbleDetailsModal
                  onClose={() => {setIsBubbleDetailsVisible(false); Router.push('/')}}
                  bubble={bubble}
                  allLabels={labels}
                  onSubmitNewLabel={postLabel}
                  onConfigChange={alteredLabel}
                  onSubmitNewComment={postComment}
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
            onSubmitNewBubble={postBubble}
          />
        : null}

      </main>
      <aside className={styles.menu}>

      </aside>
    </div>
  );
};

export default HomePage;