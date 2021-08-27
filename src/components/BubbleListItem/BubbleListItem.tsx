import { User } from "@prisma/client";
import { format } from 'date-fns';

import styles from './_bubbleListItem.module.css';
import Reactions from "../Reactions/Reactions";
import Avatar from "../Avatar/Avatar";
import { FilledBubble, FilledChampion } from "../../infra/types";

type Props = {
  champions: FilledChampion[];
  allUsers: User[];
  bubble: FilledBubble;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  alteredLike: (likeId: Number, bubbleId: Number) => void,

  onSubmitNewChampion: Function;
  onConfigChange: Function;
};

const BubbleListItem: React.FC<Props> = (props: Props) => {

  const image = props.bubble.author?.avatarUrl
    ? props.bubble.author.avatarUrl
    : '/anonymous-image.png';

  const newLabelsArray = props.bubble.labels?.slice(0, 3);
  const newChampionArray = props.bubble.champions;

  //console.log(newChampionArray)
  
  return (
    <div onClick={props.onClick} className={styles.bubbleContainer}>
      <div className={styles.image}>
        <Avatar
          alt='User Avatar'
          key={image}
          size={50}
          src={image}
        />
      </div>
      <div className={styles.textContent}>
        <div className={styles.title}>
          <h2>{props.bubble.title}</h2>
          <div className={styles.labels}>
            {newLabelsArray.map(label => (
              <p key={label.id} style={{ backgroundColor: label.color }}>{label.name}</p>
            ))}
          </div>
        </div>
        <div className={styles.description}>
          <p>{props.bubble.description}</p>
        </div>

        <div className={styles.reactions}>
          <div className={styles.champion}>
            <p> Champions: </p>
            <div className={styles.championImage}>
              {newChampionArray.map(champion => (
                <div className={styles.championName} key={champion.champion.id}>
                  <div className={styles.imageChampion}>
                    <Avatar
                      alt='User Avatar'
                      key={image}
                      size={50}
                      src={champion.champion.avatarUrl ?? '/anonymous-image.png'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Reactions
              comments={props.bubble.comments}
              likes={props.bubble.likes}
              alteredLike={(likeId) => props.alteredLike(likeId, props.bubble.id)}
            />
            <p className={styles.date}>{format(new Date(props.bubble.createdAt), 'dd/MM/yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleListItem;
