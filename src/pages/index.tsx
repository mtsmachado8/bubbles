import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Router from "next/router";
import Link from 'next/link';

import { Bubble, Label, Comment } from "@prisma/client";
import useFetch from "../hooks/swr";
import api from "../services/api";

import Header from '../components/Header/Header';
import BubbleListItem from "../components/BubbleListItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';
import NewBubbleModal from "../components/NewBubbleModal/NewBubbleModal";
import BubbleDetailsModal from "../components/BubbleDetailsModal/BubbleDetailsModal";

import postBubbles from '../services/postBubbles';
import postComments from '../services/postComments';
import postLabels from '../services/postLabels';
import alteredLabels from '../services/alteredLabels';

import styles from './_home.module.css';

export const getStaticProps: GetStaticProps = async () => {
  const bubbles = await api.get('/bubbles');
  const labels = await api.get('/labels');

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

const HomePage: React.FC<Props> = ( props: Props ) => {
  const [ labels, setLabels ] = useState<Label[]>(props.initialLabelsData);
  const [ bubbles, setBubbles ] = useState<FilledBubble[]>(props.initialBubblesData);
  const [ oppenedBubbleId, setOppenedBubbleId ] = useState(null);
  const [ isBubbleDetailsVisible, setIsBubbleDetailsVisible ] = useState(false);
  const [ isNewBubbleModalVisible, setIsNewBubbleModalVisible ] = useState(false);

  const { data: bubblesData } = useFetch('/bubbles');
  const { data: labelsData } = useFetch('/labels');

  useEffect(() => {
    if(bubblesData !== undefined) {
      setBubbles(bubblesData?.map(bubble => ({
        ...bubble,
        createdAt: new Date(bubble.createdAt),
      })));
    };

    if(labelsData !== undefined) {
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