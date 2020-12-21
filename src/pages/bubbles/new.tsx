import React from 'react';
import Router from 'next/router';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

import postBubbles from '../../infra/services/postBubbles';

const NewBubble: React.FC = () => {
  
  const postBubble = (bubbleInfo, userInfo) => {
    postBubbles(bubbleInfo, userInfo)
    Router.push('/')
  };

  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')}
      onSubmitNewBubble={postBubble}
    />
  );
};

export default NewBubble;