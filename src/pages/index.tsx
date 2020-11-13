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
import BubbleDetails from "../components/BubbleDetails/BubbleDetails";

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
  const [bubbleDetails, setBubbleDetails] = useState(false)

  return (
    <div className={styles.homePage}>
      <main className={styles.container}>
        <Header/>

        <div className={styles.bubblesContainer}>

          {props.bubbles.map((bubble) => (
            <div>
              <Link href={`/?[id]=${bubble.id}`} as={`/bubbles/${bubble.id}`} key={bubble.id}>
                <BubbleListItem onClick={() => setBubbleDetails(true)} bubble={bubble} />
              </Link>

              {bubbleDetails ?
                  <BubbleDetails
                    onClose={() => {setBubbleDetails(false); Router.back();}}
                    bubble={bubble}
                  />
                : null}
            </div>
          ))}

        </div>

        <Link href={'/?new'} as={`/bubbles/new`}>
          <FloatingButton onClick={() => setBubbleDetails(true)} />
        </Link>

      </main>
      <aside className={styles.menu}>

      </aside>
    </div>
  );
};

export default HomePage;