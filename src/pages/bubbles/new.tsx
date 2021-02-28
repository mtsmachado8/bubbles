import React from 'react';
import Router from 'next/router';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

import postBubble from '../../infra/services/postBubble';

const NewBubble: React.FC = () => {
  
  const postBubbleHandler = (bubbleInfo, userInfo) => {
    postBubble(bubbleInfo, userInfo)
    Router.push('/')
  };

  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')}
      onSubmitNewBubble={postBubbleHandler}
    />
  );
};

export default NewBubble;