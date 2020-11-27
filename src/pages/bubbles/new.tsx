import React from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';

import api from '../../services/api';

import NewBubbleModal from '../../components/NewBubbleModal/NewBubbleModal';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

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
      toast.success('Bubble successfully registered!', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      Router.push('/');

    } catch {
      toast.error('Registration error! Try again', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
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