import React, { useState } from 'react';

import { Label } from "@prisma/client";

import styles from './_labels.module.css';

type Props = {
  labels?: Label[];
}

const Labels: React.FC<Props> = (props: Props) => {
  const [ labels, setLabels ] = useState([]);
  const [ isNewLabelVisible, setIsNewLabelVisible ] = useState(false);
  const [ isConfigLabelVisible, setIsConfigLabelVisible ] = useState(false);

  return(
    <div className={styles.labelsPage}>
      <div className={styles.button}>
        <h5>Labels</h5>
        <p onClick={() => setIsNewLabelVisible(!isNewLabelVisible)}>+</p>
      </div>
      <div className={styles.labelsContent}>
        {/* {labels.map(label => ( */}
          <div className={styles.labelName}>
            <p>Infraestrutura</p>
          </div>
        {/* ))} */}
        <div className={styles.labelConfig} onClick={() => setIsConfigLabelVisible(!isConfigLabelVisible)}>
          <p>Config Labels</p>
        </div>
      </div>

      {isNewLabelVisible
      ? <div className={styles.newLabelContent}>
          <div className={styles.inputContent}>
            <label htmlFor='name'>Label Name</label>
            <input
              name='name'
              id='name'
              autoFocus
              required
              autoComplete='off'
              className={styles.name}
            />
            <input
              name='description'
              autoComplete='off'
              className={styles.description}
            />
          </div>

          <div className={styles.colorContent}>
            <div className={styles.colorInput}>
              <label htmlFor='color'>Color</label>
              <div className={styles.inputs}>
                <input type='color' autoComplete='off'  />
                <input type='text' autoComplete='off' />
              </div>
            </div>
            <div className={styles.preview}>
              <label>Preview</label>
              <p>Produto</p>
            </div>
          </div>

          <div className={styles.buttons}>
            <button type='button' className={styles.cancel} onClick={() => setIsNewLabelVisible(false)}>Cancel</button>
            <button type='button' className={styles.submit}>New Label</button>
          </div>
        </div>

      : null
      }
    </div>
  );
};

export default Labels;