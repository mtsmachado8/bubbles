import React from 'react';
import Link from 'next/link'

import styles from './_floatingButton.module.css';

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
};

const FloatingButton: React.FC<Props> = ({onClick}: Props) => {
  return (
    <div className={styles.plusContainer} onClick={onClick}>
      <button type="button">+</button>
    </div>
  );
};

export default FloatingButton;