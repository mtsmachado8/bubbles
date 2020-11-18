import React, { FormEvent, useState } from "react";
import Router from 'next/router';

import { PrismaClient } from '@prisma/client';

import Modal from "../Modal/Modal";

import noImage from '../../../public/anonymous-image.png';

import styles from './_newBubbleModal.module.css';

type Props = {
  onClose: any;
};

const BubbleDetails: React.FC<Props> = ({ onClose }: Props) => {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ content, setContent ] = useState('');
  
  const prisma = new PrismaClient();
  
  const handleNewBubble = (e: FormEvent) => {
    e.preventDefault();

    prisma.bubble.create({
      data: {
        title: title,
        description: description,
        content: content,
      },
    });

    Router.push('/');
  };
  
  const placeholder = 'Tell us:\n1 - What is the problem?\n2 - How to fix?\n3 - What are the possible problems after fix it?'
  
  return(
    <Modal onClose={onClose}>
      <div className={styles.newBubblePage}>
        <img src={noImage} alt="Avatar"/>
        <div className={styles.square}></div>
        <form onSubmit={handleNewBubble} className={styles.newBubbleDetails}>

          <div className={styles.titleContainer}>
            <input 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description about the bubble"
            />
          </div>
          <div className={styles.textContent}>
            <div className={styles.typeText}>
              <p>Write</p>
            </div>
            <textarea 
              className={styles.textArea} 
              placeholder={placeholder}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <div className={styles.buttonContent}>
              <button type="submit" className={styles.anonymous}>Submit Anonymously</button>
              <button type="submit">Login with google</button>
            </div>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default BubbleDetails