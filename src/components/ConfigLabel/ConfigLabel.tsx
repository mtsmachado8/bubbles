import React from 'react';

import { Label } from "@prisma/client";

import styles from './_configLabel.module.css';

type Props = {
  labels?: Label[];
}

const ConfigLabel: React.FC<Props> = (props: Props) => {

  return(
    <div className={styles.configLabelContent}>
      <div className={styles.square}></div>
      <div className={styles.title}>
        <p>Apply and remove labels</p>
      </div>
      <div className={styles.labelsContent}>
        {props.labels.map(label => (
          <div className={styles.label} key={label.id}>
            <div className={styles.addOrRemove}>
              <p>&#x02518;</p>
            </div>
            <div className={styles.labelDetails}>
              <div className={styles.labelName}>
                <div className={styles.labelColor}></div>
                <p>{label.name}</p>
              </div>
              {label.description
              ? <p>{label.description}</p>
              : <p>Proposals for {label.name} area</p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigLabel;