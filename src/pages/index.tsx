import React, { useState } from "react";
import { GetStaticProps } from "next";
import Router from "next/router";
import Link from 'next/link';

import DBClient from '../../prisma/client';
import { Bubble } from "@prisma/client";

import Header from '../components/Header/Header';
import BubbleListItem from "../components/BubbleLisItem/BubbleListItem";
import FloatingButton from '../components/FloatingButton/FloatingButton';

import styles from './_home.module.css';
import Modal from "../components/Modal/Modal";

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
    author: {
        avatarUrl: string;
    };
  })[]
};

const HomePage: React.FC<Props> = (props: Props) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  return (
    <div className={styles.homePage}>
      <main className={styles.container}>
        <Header/>
        {props.bubbles.map((bubble) => (
          <Link href={`/?[id]=${bubble.id}`} as={`/bubbles/${bubble.id}`} key={bubble.id}>
            <BubbleListItem onClick={() => setModalIsVisible(true)} bubble={bubble} />
          </Link>
        ))}
        <Link href={'/?new'} as={`/bubbles/new`}>
          <FloatingButton onClick={() => setModalIsVisible(true)} />
        </Link>

        {modalIsVisible ?
          <Modal
            onClose={() => {setModalIsVisible(false); Router.back();}}
          >
          </Modal>
        : null}

      </main>
      <aside className={styles.menu}>

      </aside>
    </div>
  );
};

export default HomePage;