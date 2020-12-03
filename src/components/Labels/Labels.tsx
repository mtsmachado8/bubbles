import React, { useState } from 'react';

import { Label } from "@prisma/client";

import styles from './_labels.module.css';
import NewLabel from '../NewLabel/NewLabel';
import ConfigLabel from '../ConfigLabel/ConfigLabel';

type Props = {
  labels?: Label[];
  allLabels: Label[];
  onSubmitNewLabel: Function;
}

const Labels: React.FC<Props> = (props: Props) => {
  const [ isNewLabelVisible, setIsNewLabelVisible ] = useState(false);
  const [ isConfigLabelVisible, setIsConfigLabelVisible ] = useState(false);

  return(
    <div className={styles.labelsPage}>
      <div className={styles.button}>
        <h5>Labels</h5>
        <p onClick={() => setIsNewLabelVisible(!isNewLabelVisible)}>+</p>
      </div>
      <div className={styles.labelsContent}>
        {props.labels?.map(label => (
          <div className={styles.labelName} key={label.id}>
            <p>{label.name}</p>
          </div>
        ))}
        <div className={styles.labelConfig} onClick={() => setIsConfigLabelVisible(!isConfigLabelVisible)}>
          <p className={styles.labelConfigParagraph}>Config Labels</p>
          {isConfigLabelVisible
          ? <ConfigLabel 
              labels={props.allLabels}
            />

          : null
          }
        </div>
      </div>

      {isNewLabelVisible
      ? <NewLabel 
          onClick={() => setIsNewLabelVisible(false)}
          onSubmitNewLabel={props.onSubmitNewLabel}
        />

      : null
      }
    </div>
  );
};

export default Labels;