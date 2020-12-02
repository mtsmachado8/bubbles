import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { GetStaticProps } from "next";
import Router from "next/router";
import Link from 'next/link';

import { Bubble, Label, Comment } from "@prisma/client";
import prisma from '../../prisma/client';
import api from "../services/api";

import Header from '../components/Header/Header';
import BubbleListItem from "../components/BubbleLisItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';
import BubbleDetails from "../components/BubbleDetails/BubbleDetails";
import NewBubbleModal from "../components/NewBubbleModal/NewBubbleModal";

import styles from './_home.module.css';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const getStaticProps: GetStaticProps = async () => {
  const bubblesResponse = await prisma.bubble.findMany({
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
  });

  const serializableBubbles = bubblesResponse.map(bubble => ({
    ...bubble,
    createdAt: bubble.createdAt.toString(),

    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toString(),
    })),
  }));
  
  return {
    props: { bubbles: serializableBubbles },
    revalidate: 1,
  };
};

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  }
}

type FilledBubble = Bubble & {
  labels: Label[],
  comments: FilledComment[],
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubbles: FilledBubble[],
};

const HomePage: React.FC<Props> = (props: Props) => {
  const [ bubbles, setBubbles ] = useState<FilledBubble[]>([])
  const [ isBubbleDetailsVisible, setIsBubbleDetailsVisible ] = useState(false);
  const [ oppenedBubbleId, setOppenedBubbleId ] = useState(null);
  const [ isNewBubbleModalVisible, setIsNewBubbleModalVisible ] = useState(false);

  useEffect(() => {
    setBubbles(props.bubbles.map(bubble => ({
      ...bubble,
      createdAt: new Date(bubble.createdAt)
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
      toast.success('Bubble successfully registered!', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      Router.push('/');
      setIsNewBubbleModalVisible(false);

    } catch {
      toast.error('Registration error! Try again', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
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
      toast.success('Comment registrated!', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      Router.reload();
    
    } catch {
      toast.error('Registration error! Try again', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
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