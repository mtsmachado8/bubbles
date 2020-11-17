import React from 'react';
import Router from 'next/router';

import { Bubble } from '@prisma/client';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

type Props = {
  newBubble: Bubble;
}

const NewBubble: React.FC<Props> = ({ newBubble }: Props) => {

  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')} 
    />
  );
};

export default NewBubble;