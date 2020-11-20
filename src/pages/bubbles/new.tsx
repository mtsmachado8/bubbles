import React from 'react';
import Router from 'next/router';

import api from '../../services/api';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

const NewBubble: React.FC = () => {

  const postBubble = async (e, userInfo) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const content = e.target.content.value;
    const author = userInfo
  
    try {
      await api.post('/bubbles', {
        title,
        description,
        content,
        author,
      });
      alert('Bubble successfully registered!')
      Router.push('/');

    } catch {
      alert('Registration error! Try again');
      Router.reload();
    };
  };

  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')}
      onSubmitNewBubble={postBubble}
    />
  );
};

export default NewBubble;