import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Router from "next/router";
import Link from 'next/link';

import { Bubble, Label, Comment } from "@prisma/client";
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
      comments: true,
    },
  });

  const serializableBubbles = bubblesResponse.map(bubble => ({
    ...bubble,
    createdAt: bubble.createdAt.toDateString(),

    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toDateString(),
    })),
  }));
  
  return {
    props: { bubbles: serializableBubbles },
    revalidate: 1,
  };
};

type Props = {
  bubbles: FilledBubble[];
};

type FilledBubble = Bubble & {
  labels: Label[];
  comments: Comment[];
  author: {
      avatarUrl: string;
      name: string;
  };
};

const HomePage: React.FC<Props> = (props: Props) => {
  const [bubbles, setBubbles] = useState<FilledBubble[]>([])
  const [isBubbleDetailsVisible, setIsBubbleDetailsVisible] = useState(false);
  const [oppenedBubbleId, setOppenedBubbleId] = useState(null);
  const [isNewBubbleModalVisible, setIsNewBubbleModalVisible] = useState(false);

  useEffect(() => {
    setBubbles(props.bubbles.map(bubble => ({
      ...bubble,
      createdAt: new Date(bubble.createdAt),

      comments: bubble.comments.map(comment => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
      }))
    })))
  }, []);
  
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

    const content = userComment;
    const author = userInfo;
    const bubbleId = oppenedBubbleId;
  
    try {
      await api.post('/comments', {
        content,
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