import React from 'react';

import styles from './_modal.module.css';

type Props = {
  id?: string,
  onClose: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
  children,
}

const Modal: React.FC<Props> = ({children, onClose, id = 'modal'}: Props) => {
  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose(e);
  }

  return (
    <div id={id} className={styles.modalOverlay} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <p className={styles.closeModal} onClick={onClose}>X</p>

        <div className={styles.modalContainer}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;