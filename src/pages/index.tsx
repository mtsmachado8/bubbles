import React, { useContext, useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Router from "next/router";
import Link from 'next/link';

import { getAll as getAllBubbles } from './api/bubbles/_repository';
import { getAll as getAllLabels } from './api/labels/_repository';
import { getAll as getAllUsers } from './api/users/_repository';
import { Bubble, Label, Comment, Like, User } from "@prisma/client";
import AuthContext from "../infra/contexts/AuthContext";
import useFetch from "../infra/hooks/swr";

import BubbleDetailsModal from "../components/BubbleDetailsModal/BubbleDetailsModal";
import BubbleListItem from "../components/BubbleListItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';
import NewBubbleModal from "../components/NewBubbleModal/NewBubbleModal";
import AsideHome from "../components/AsideHome/AsideHome";
import Header from '../components/Header/Header';
import SegmentedPicker from "../components/SegmentedPicker/SegmentedPicker";

import alteredLabels from '../infra/services/alteredLabels';
import alteredLikes from '../infra/services/alteredLikes';
import postComments from '../infra/services/postComments';
import postBubble from '../infra/services/postBubble';
import postLabels from '../infra/services/postLabels';

import styles from './_home.module.css';
import alteredChampions from "../infra/services/alteredChampion";
import { FilledBubble } from "../infra/types";

export const getStaticProps: GetStaticProps = async () => {
  const bubbles = await getAllBubbles();
  const users = await getAllUsers();
 
  const labels = await getAllLabels();
  const stateLabels = labels
    .filter(label => label.isState)
    .sort((label1, label2) => label1.stateIndex - label2.stateIndex)
    .map(label => label.name)

  return {
    props: {
      initialBubblesData: bubbles,
      initialLabelsData: labels,
      initialUsersData: users,
      stateLabels
    },
  };
};

type Props = {
  initialUsersData: User[];
  initialBubblesData: FilledBubble[];
  initialLabelsData: Label[];
  stateLabels: String[];
};

const HomePage: NextPage<Props> = ( { initialBubblesData, initialLabelsData, stateLabels, initialUsersData }: Props ) => {
  const [ currentLabelState, setCurrentLabelState ] = useState<Number>(1)

  const shouldShowBubble = bubble => {
    const notInAnyState = () => bubble.labels.every(label => !label.isState)
    const currentStateLabel = () => {
      return bubble.labels.some(label => label.stateIndex === currentLabelState)
    }
    const isOnDefaultLabelState = currentLabelState === 1
    if(isOnDefaultLabelState){
      return (notInAnyState() || currentStateLabel())
    } else {
      return currentStateLabel()
    }
  }
  const mostLikes = (bubble1, bubble2) => (
    bubble2.likes.length - bubble1.likes.length
  )
  const fillCreatedAt = bubble => ({
    ...bubble,
    createdAt: new Date(bubble.createdAt),
  })

  const [ bubbles, setBubbles ] = useState<FilledBubble[]>(
    initialBubblesData
      .sort(mostLikes)
      .filter(shouldShowBubble)
  );

  const [ labels, setLabels ] = useState<Label[]>(initialLabelsData);

  const [ isNewBubbleModalVisible, setIsNewBubbleModalVisible ] = useState(false);
  const [ isBubbleDetailsVisible, setIsBubbleDetailsVisible ] = useState(false);
  
  const [ oppenedBubble, setOppenedBubble ] = useState<FilledBubble>(null);

  const { data: bubblesData } = useFetch('/bubbles');
  const { data: labelsData } = useFetch('/labels');

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    if(bubblesData != undefined) {
      const filledBubbles: FilledBubble[] = bubblesData.map(fillCreatedAt);

      const sortedBubbles = filledBubbles
        .sort(mostLikes)
        .filter(shouldShowBubble)
      
      setBubbles(sortedBubbles)

      if(oppenedBubble){ // Refresh Oppened Bubble
        setOppenedBubble(filledBubbles.find(bubble => bubble.id === oppenedBubble.id))
      }
    };
    
    
    if(labelsData != undefined) {
      setLabels(labelsData);
    };

  }, [bubblesData, labelsData, currentLabelState]);

  const postBubbleHandler = (bubblInfo, userInfo) => {
    postBubble(bubblInfo, userInfo);
    Router.push('/');
    setIsNewBubbleModalVisible(false);
  };

  const postComment = (newComment, userInfo) => {
    postComments(newComment, userInfo, oppenedBubble.id);
  };

  const postLabel = (newLabel) => {
    postLabels(newLabel, oppenedBubble.id);
  };

  const alteredLabel = (id, selectedLabel) => {
    alteredLabels(id , selectedLabel, oppenedBubble.id);
  };

  const alteredChampion = (bubbleId, championId, isSelected) => {
    alteredChampions(bubbleId, championId, isSelected);
  };

  const alteredLike = (likeId: Number, bubbleId: Number) => {
    alteredLikes(bubbleId, loggedUser, likeId);
  };

  return (
    <div className={styles.homePage}>
      <main className={styles.container}>
        <div className={styles.bubblesContainer}>
          <Header/>

          <SegmentedPicker
            stateLabels={stateLabels.length ? stateLabels : undefined}
            currentLabelState={currentLabelState}
            onSelectedState={setCurrentLabelState}
          />
          {bubbles.map((bubble) => (
            <div key={bubble.id}>
              <Link href={`/?[id]=${bubble.id}`} as={`/bubbles/${bubble.id}`} passHref>
                <BubbleListItem
                  onClick={() => {
                    setIsBubbleDetailsVisible(true);
                    setOppenedBubble(bubble)}
                  }
                  bubble={bubble}
                  alteredLike={alteredLike}
                />
              </Link>
            </div>
          ))}
          {isBubbleDetailsVisible &&
            <BubbleDetailsModal
              allUsers={initialUsersData}
              champions={oppenedBubble.champions}
              onSubmitNewChampion={() => {}}
              onClose={() => {setIsBubbleDetailsVisible(false); Router.push('/'); setOppenedBubble(null)}}
              bubble={oppenedBubble}
              allLabels={labels}
              onSubmitNewLabel={postLabel}
              onConfigChampionChange={alteredChampion}
              onConfigLabelChange={alteredLabel}
              onSubmitNewComment={postComment}
              alteredLike={alteredLike}
            />
          }
        </div>

        <Link href='/' as='/bubbles/new' passHref>
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