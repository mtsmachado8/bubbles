import React, { useState } from "react";
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
    author: {
        avatarUrl: string;
    };
  })[]
};

const HomePage: React.FC<Props> = (props: Props) => {
  const [isBubbleDetailsVisible, setIsBubbleDetailsVisible] = useState(false);
  const [isNewBubbleModalVisible, setIsNewBubbleModalVisible] = useState(false);

  const postBubble = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const content = e.target.content.value;
    try{
      await api.post('/bubbles', {
        title,
        description,
        content,
      });
      alert('Bubble cadastrado com sucesso!')
      Router.push('/');
      setIsNewBubbleModalVisible(false);

    } catch {
      alert('Erro no cadastro! Tente novamente');
      Router.reload();
    };
  };

  return (
    <div className={styles.homePage}>
      <main className={styles.container}>
        <Header/>

        <div className={styles.bubblesContainer}>

          {props.bubbles.map((bubble) => (
            <div key={bubble.id}>
              <Link href={`/?[id]=${bubble.id}`} as={`/bubbles/${bubble.id}`}>
                <BubbleListItem onClick={() => setIsBubbleDetailsVisible(true)} bubble={bubble} />
              </Link>

              {isBubbleDetailsVisible ?
                <BubbleDetails
                  onClose={() => {setIsBubbleDetailsVisible(false); Router.push('/');}}
                  bubble={bubble}
                />
              : null}
            </div>
          ))}

        </div>

        <Link href='/' as='/bubbles/new'>
          <FloatingButton onClick={() => setIsNewBubbleModalVisible(true)} />
        </Link>

        {isNewBubbleModalVisible ?
          <NewBubbleModal
            onClose={() => {setIsNewBubbleModalVisible(false); Router.push('/');}}
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