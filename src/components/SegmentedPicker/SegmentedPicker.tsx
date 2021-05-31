import React, { useState } from 'react';

import styles from './_segmentedPicker.module.css';

type Props = {
  stateLabels?: String[]
  currentLabelState?: Number
  onSelectedState: (stateIndex: Number) => void
}

const SegmentedPicker: React.FC<Props> = ({
  stateLabels = ['Archieved', 'Refining'],
  currentLabelState = 1,
  onSelectedState = () => {}
}: Props) => {
  const isSelected = (i) => i === currentLabelState

  return(
    <div
      className={styles.Row}
    >
      <div
        className={styles.SegmentedPickerContainer}
      >
        {stateLabels.map((state, i) => (
          <div
            key={i}
            onClick={() => {onSelectedState(i)}}
            className={isSelected(i) ? styles.selected : styles.unselected}>
              {state}
            </div>
        ))}
      </div>
    </div>
    
  );
};

export default SegmentedPicker;