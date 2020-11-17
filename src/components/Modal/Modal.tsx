import React from 'react';

import styles from './_modal.module.css';

type Props = {
  id?: string,
  onClose: any,
  children,
}

const Modal: React.FC<Props> = ({children, onClose, id = 'modal'}: Props) => {
  const handleOutsideClick = (e: any) => {
    if(e.target.id === id) onClose();
  }

  return (
    <div id={id} className={styles.modalOverlay} onClick={handleOutsideClick}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;