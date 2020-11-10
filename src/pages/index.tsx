import React from "react";
import { GetStaticProps } from "next";
import BubbleListItem from "../components/BubbleLisItem/BubbleListItem";
import Router from "next/router";
import DBClient from '../../prisma/client';
import { Bubble } from "@prisma/client";
import Header from '../components/Header/Header';
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
    author: {
        avatarUrl: string;
    };
  })[]
};

const HomePage: React.FC<Props> = (props: Props) => (
  <div className={styles.homePage}>
    <main className={styles.container}>
      <Header/>
      {props.bubbles.map((bubble) => (
        <BubbleListItem key={bubble.id} onClick={() => Router.push("/bubbles/[id]", `/bubbles/${bubble.id}`)} bubble={bubble} />
      ))}
    </main>
    <aside className={styles.menu}>

    </aside>
  </div>
);

export default HomePage;