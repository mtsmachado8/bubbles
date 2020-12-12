import api from './api';
import Router from 'next/router';
import { toast } from 'react-toastify';

import { User, Bubble } from '@prisma/client';

const postBubble = async ({title, description, content}: Bubble, author: User) => {
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
    toast.error('Registration error! Please, reload the page and try again', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });

  };
};

export default postBubble;