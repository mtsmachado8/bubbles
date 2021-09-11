import React, { useState } from 'react';

import { User } from "@prisma/client";

import styles from '../Champions/_champions.module.css';
import ConfigChampion from '../ConfigChampion/ConfigChampion';
import { FilledBubble, FilledChampion } from '../../infra/types';
import Avatar from '../Avatar/Avatar';

type Props = {
  champions: FilledChampion[];
  allUsers: User[];
  bubble: FilledBubble;

  onSubmitNewChampion: Function;
  onConfigChange: Function;

}

const Champions: React.FC<Props> = (props: Props) => {
  const [isNewChampionVisible, setIsNewChampionVisible] = useState(false);
  const [isConfigChampionVisible, setIsConfigChampionVisible] = useState(false);

  const onConfigChampionClick = () => {
    setIsConfigChampionVisible(!isConfigChampionVisible);
    setIsNewChampionVisible(false)
  };

  return (
    <div className={styles.championsPage}>
      <div className={styles.button}>
        <h5>Champions</h5>
      </div>
      <div className={styles.championsContent}>
        {props.champions.map(champion => (
          <div className={styles.championName} key={champion.champion.id}>
            <div className={styles.image}>
              <Avatar
                alt='User Avatar'
                key={''}
                size={50}
                src={champion.champion.avatarUrl ?? '/anonymous-image.png'}
              />
            </div>
            <div className={styles.name}>{champion.champion.name} </div>
          </div>
        ))}
        <div
          className={styles.championsConfig}
          onClick={onConfigChampionClick}>
          <p className={styles.championsConfigParagraph}>Config Champions</p>
          {isConfigChampionVisible
            ? <ConfigChampion
              bubble={props.bubble}
              champions={props.champions}
              onConfigChange={props.onConfigChange}
              allUsers={props.allUsers}
            />
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default Champions;