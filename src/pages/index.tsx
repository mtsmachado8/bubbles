import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Router from "next/router";
import Link from 'next/link';

import { Bubble } from "@prisma/client";
import DBClient from '../../prisma/client';
import api from "../services/api";

import Header from '../components/Header/Header';
import BubbleListItem from "../components/BubbleLisItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';
import BubbleDetails from "../components/BubbleDetails/BubbleDetails";
import NewBubbleModal from "../components/NewBubbleModal/NewBubbleModal";

import styles from './_home.module.css';

const prisma = DBClient.getInstance().prisma;

export const getStaticProps: GetStaticProps = async () => {
  const bubblesResponse = await prisma.bubble.findMany({
    include: {
      labels: true,
      author: {
        select: {
          avatarUrl: true,
        },
      },
    },
  });

  // Date is not serializable on next yet
  const serializableBubbles = bubblesResponse.map(bubble => ({
    ...bubble,
    createdAt: bubble.createdAt.toDateString()
  }))
  
  return {
    props: { bubbles: serializableBubbles },
    revalidate: 1
  };
};

type Props = {
  bubbles: (Bubble & {
    labels: [];
    comments:[];
    author: {
        avatarUrl: string;
    };
  })[]
};

const HomePage: React.FC<Props> = (props: Props) => {
  const [bubbles, setBubbles] = useState([])
  const [isBubbleDetailsVisible, setIsBubbleDetailsVisible] = useState(false);
  const [oppenedBubbleId, setOppenedBubbleId] = useState(null);
  const [isNewBubbleModalVisible, setIsNewBubbleModalVisible] = useState(false);

  useEffect(() => {
    setBubbles(props.bubbles.map(bubble => ({
      ...bubble,
      createdAt: new Date(bubble.createdAt)
    })))
  }, [])
  
  const postBubble = async (e, userInfo) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const content = e.target.content.value;
    const author = userInfo
  
    try {
      await api.post('/bubbles', {
        title,
        description,
        content,
        author,
      });
      alert('Bubble successfully registered!')
      Router.push('/');
      setIsNewBubbleModalVisible(false);

    } catch {
      alert('Registration error! Try again');
      Router.reload();
    };
  };

  const postComment = async (e, userComment, userInfo) => {
    e.preventDefault();

    const comment = userComment;
    const author = userInfo;
    const bubbleId = oppenedBubbleId;
  
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
                <BubbleDetails
                  onClose={() => {setIsBubbleDetailsVisible(false); Router.push('/')}}
                  onSubmitNewComment={postComment}
                  bubble={bubble}
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