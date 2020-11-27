import React from 'react';
import Link from 'next/link'

import styles from './_floatingButton.module.css';

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  isVisible: boolean
};

const FloatingButton: React.FC<Props> = ({ onClick, isVisible }: Props) => {
  return (
    <div className={isVisible ? styles.plusContainer : styles.plusContainerHidden} onClick={onClick}>
      <button type="button">+</button>
    </div>
  );
};

export default FloatingButton;