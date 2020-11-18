import React from 'react';
import Router from 'next/router';

import api from '../../services/api';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

const NewBubble: React.FC = () => {

  const postBubble = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const content = e.target.content.value;
    
    await api.post('/bubbles', {
      title,
      description,
      content,
    }).then(() => {
      alert('Bubble cadastrado com sucesso!');

      Router.push('/');
    }).catch(() => {
      alert('Erro no cadastro! Tente novamente.');

      Router.reload();
    });
  };

  return (
    <NewBubbleModal 
      onClose={() => Router.push('/')}
      onSubmitNewBubble={postBubble}
    />
  );
};

export default NewBubble;