import React, { useState } from 'react';

import { Label } from "@prisma/client";

import styles from './_labels.module.css';
import NewLabel from '../NewLabel/NewLabel';
import ConfigLabel from '../ConfigLabel/ConfigLabel';

type Props = {
  labels?: Label[];
  allLabels: Label[];
  onSubmitNewLabel: Function;
  onConfigChange: Function;
}

const Labels: React.FC<Props> = ( props: Props ) => {
  const [ isNewLabelVisible, setIsNewLabelVisible ] = useState(false);
  const [ isConfigLabelVisible, setIsConfigLabelVisible ] = useState(false);

  const onConfigLabelClick = () => {
    setIsConfigLabelVisible(!isConfigLabelVisible);
    setIsNewLabelVisible(false)
  };

  const onNewLabelClick = () => {
    setIsNewLabelVisible(!isNewLabelVisible);
    setIsConfigLabelVisible(false)
  };

  const onSubmitNewLabel = (label) => {
    props.onSubmitNewLabel(label);
    setIsNewLabelVisible(false);
  }

  return(
    <div className={styles.labelsPage}>
      <div className={styles.button}>
        <h5>Labels</h5>
        <p onClick={onNewLabelClick}>+</p>
      </div>
      <div className={styles.labelsContent}>
        {props.labels?.map(label => (
          <div className={styles.labelName} key={label.id}>
            <p style={{backgroundColor: label.color}}>{label.name}</p>
          </div>
        ))}
        <div 
          className={styles.labelConfig}
          onClick={onConfigLabelClick}>
          <p className={styles.labelConfigParagraph}>Config Labels</p>
          {isConfigLabelVisible
          ? <ConfigLabel 
              labels={props.labels}
              onConfigChange={props.onConfigChange}
              allLabels={props.allLabels}
            />
          : null
          }
        </div>
      </div>

      {isNewLabelVisible
      ? <NewLabel
          onClick={() => setIsNewLabelVisible(false)}
          onSubmitNewLabel={onSubmitNewLabel}
        />

      : null
      }
    </div>
  );
};

export default Labels;