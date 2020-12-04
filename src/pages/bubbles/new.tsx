import React from 'react';
import Router from 'next/router';
import { GetStaticProps } from 'next';

import prisma from '../../../prisma/client';
import { Label } from '@prisma/client';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

import postBubbles from '../../services/postBubbles';

export const getStaticProps: GetStaticProps = async () => {
  const labels = await prisma.label.findMany();

  return { props: { labels } };
};

type Props = {
  labels: Label[];
};

const NewBubble: React.FC<Props> = (props: Props) => {

  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')}
      onSubmitNewBubble={postBubbles}
    />
  );
};

export default NewBubble;