import React, { useState, useEffect } from 'react';

import { Label } from "@prisma/client";

import styles from './_configLabel.module.css';

type FilledLabels = Label & {
  selected: boolean;
};

type Props = {
  labels?: Label[];
  allLabels: Label[];
  onConfigChange: Function;
};

const ConfigLabel: React.FC<Props> = ( props: Props ) => {
  const [ filledLabels, setFilledLabels ] = useState<FilledLabels[]>([])

  useEffect(() => {
      const allLabels = props.allLabels.map(label => ({
        ...label,
        selected: false,
      }));
      const labels = props.labels.map(label => ({
        ...label,
        selected: true,
      }));
      const selectedLabels = labels.concat(
        allLabels.filter( ({id}) => !labels.find(label => label.id == id))
      );
      
      setFilledLabels(selectedLabels);
    
  }, [props.allLabels, props.labels]);
  
  return(
    <div className={styles.configLabelContent}>
      <div className={styles.square}></div>
      <div className={styles.title}>
        <p>Apply and remove labels</p>
      </div>
      <div className={styles.labelsContent}>
        {filledLabels.map(label => (
          <div
            className={styles.label} key={label.id}
            onClick={(e) => {
              e.preventDefault();
              props.onConfigChange(label.id, label.selected);
            }}
          >
            <div className={label.selected ? styles.selectedLabel : styles.unselectedLabel}>
              <p>&#x02518;</p>
            </div>
            <div className={styles.labelDetails}>
              <div className={styles.labelName}>
                <div className={styles.labelColor} style={{backgroundColor: label.color}}></div>
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