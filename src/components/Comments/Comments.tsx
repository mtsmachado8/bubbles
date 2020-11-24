import React, { useState } from 'react';

import NewComment from '../NewComment/NewComment';

import styles from './_comments.module.css';

type Props = {
  comments: any;
}

const Comments: React.FC = () => {
  return(
    <div className={styles.commentSpace}>

      <div className={styles.alreadyCommented}>
        {/* {comments.map(comment => ( */}
          <div className={styles.cardBox}>
            <img src='/anonymous-image.png' alt='Avatar Image'/>
            <div className={styles.square}></div>
            <div className={styles.commentDetail}>
              <div className={styles.nameBox}>
                <h4>Narcisio Cardoso</h4>
                <p>commented 22 hours ago</p>
              </div>
              <div className={styles.commentText}>
                <p>Acho válido Marcelo, 
                  gostei muito da sua primeira sugetão, 
                  o que acham de implementarem isso na 
                  empresa e seguir conforme a demanda</p>
              </div>
            </div>
          </div>

          <div className={styles.cardBox}>
            <img src='/anonymous-image.png' alt='Avatar Image'/>
            <div className={styles.square}></div>
            <div className={styles.commentDetail}>
              <div className={styles.nameBox}>
                <h4>Narcisio Cardoso</h4>
                <p>commented 22 hours ago</p>
              </div>
              <div className={styles.commentText}>
                <p>Acho válido Marcelo, 
                  gostei muito da sua primeira sugetão, 
                  o que acham de implementarem isso na 
                  empresa e seguir conforme a demanda</p>
              </div>
            </div>
          </div>
          <div className={styles.cardBox}>
            <img src='/anonymous-image.png' alt='Avatar Image'/>
            <div className={styles.square}></div>
            <div className={styles.commentDetail}>
              <div className={styles.nameBox}>
                <h4>Narcisio Cardoso</h4>
                <p>commented 22 hours ago</p>
              </div>
              <div className={styles.commentText}>
                <p>Acho válido Marcelo, 
                  gostei muito da sua primeira sugetão, 
                  o que acham de implementarem isso na 
                  empresa e seguir conforme a demanda</p>
              </div>
            </div>
          </div>
          <div className={styles.cardBox}>
            <img src='/anonymous-image.png' alt='Avatar Image'/>
            <div className={styles.square}></div>
            <div className={styles.commentDetail}>
              <div className={styles.nameBox}>
                <h4>Narcisio Cardoso</h4>
                <p>commented 22 hours ago</p>
              </div>
              <div className={styles.commentText}>
                <p>Acho válido Marcelo, 
                  gostei muito da sua primeira sugetão, 
                  o que acham de implementarem isso na 
                  empresa e seguir conforme a demanda</p>
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default Comments;