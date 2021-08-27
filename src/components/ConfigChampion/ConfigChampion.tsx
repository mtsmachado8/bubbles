import React, { useState, useEffect } from 'react';

import { AiOutlineCheck } from "react-icons/ai";

import { User } from "@prisma/client";

import styles from "./_configChampion.module.css";
import Avatar from "../Avatar/Avatar";
import { FilledBubble, FilledChampion } from '../../infra/types';


type Props = {
  bubble: FilledBubble;
  champions?: FilledChampion[];
  allUsers: User[];
  onConfigChange: Function;
};

const ConfigChampion: React.FC<Props> = (props: Props) => {
  const [filledChampions, setFilledChampions] = useState<FilledChampion[]>([])

  useEffect(() => {
    const allUsers = props.allUsers.map(user => ({
      champion: user,
      selected: false,
    }));
    const filledChampions = props.champions.map(champion => ({
      ...champion,
      selected: true,
    }));
    const selectedChampions = filledChampions.concat(
      allUsers.filter((currentFilledChampion) =>
        !filledChampions.find(filledChampion => filledChampion.champion.id == currentFilledChampion.champion.id
        ))
    );

    console.log("selectedChampions", selectedChampions)

    setFilledChampions(selectedChampions);

  }, [props.allUsers, props.champions]);

  return (
    <div className={styles.configChampionContent}>
      <div className={styles.square}></div>
      <div className={styles.title}>
        <p>Apply and remove champions</p>
      </div>
      <div className={styles.championsContent}>
        {filledChampions.map((filledChampion, index) => (
          <div
            className={styles.champion} key={filledChampion.champion.id}
            onClick={(e) => {
              e.preventDefault();
              props.onConfigChange(props.bubble.id, filledChampion.champion.id, filledChampion.selected);
            }}
          >
            <div className={filledChampion.selected ? styles.selectedChampion : styles.unselectedChampion}>
              <AiOutlineCheck color="var(--color-primary)" />
            </div>
            <div className={styles.championDetails}>
              <div className={styles.championName}>
                <div className={filledChampion.selected ? styles.selectedChampion : styles.unselectedChampion}>
                </div>
                <div className={styles.image}>
                  <Avatar
                    alt='User Avatar'
                    key={index}
                    size={50}
                    src={filledChampion.champion.avatarUrl ?? '/anonymous-image.png'}
                  />
                </div>
                <div className={styles.championColor}></div>
                <p>{filledChampion?.champion?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigChampion;