import React, { useState } from 'react';

import styles from './_newLabel.module.css';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmitNewLabel: Function;
}

const NewLabel: React.FC<Props> = ({ onClick, onSubmitNewLabel }: Props) => {
  const [ color, setColor ] = useState('#8d47b2')
  const [ name, setName ] = useState('Content');
  const [ description, setDescription ] = useState('');

  const label = {
    name,
    description,
    color,
  };

  return(
    <form
      className={styles.newLabelContent}
      onSubmit={e => {
        e.preventDefault();
        onSubmitNewLabel(e, label);
      }}
    >
      <div className={styles.square}></div>
      <div className={styles.inputContent}>
        <label htmlFor='name'>Label Name</label>
        <input
          name='name'
          id='name'
          autoFocus
          required
          placeholder='Ex: Desenvolvimento'
          autoComplete='off'
          onChange={e => setName(e.target.value)}
          maxLength={18}
        />
        <input
          name='description'
          placeholder='Description (optional)'
          autoComplete='off'
          className={styles.description}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.colorContent}>
        <div className={styles.colorInput}>
          <label htmlFor='color'>Color</label>
          <div className={styles.inputs}>
            <input
              type='color'
              id='color'
              autoComplete='off'
              value={color}
              onChange={e => setColor(e.target.value)}
              className={styles.colorRGB}
            />
            <input
              type='text'
              autoComplete='off'
              maxLength={7}
              className={styles.colorText}
              value={color}
              onChange={e => setColor(e.target.value)} 
            />
          </div>
        </div>
        <div className={styles.preview}>
          <label>Preview</label>
          <p style={{backgroundColor: color}}>{name}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button type='button' className={styles.cancel} onClick={onClick}>Cancel</button>
        <button type='submit' className={styles.submit}>New Label</button>
      </div>
    </form>
  );
};

export default NewLabel;