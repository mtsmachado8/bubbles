import React from 'react';
import Router from 'next/router';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

const NewBubble: React.FC = () => {
  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')}
    />
  );
};

export default NewBubble;