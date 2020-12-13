import api from './api';
import { Mutate, Trigger } from '../hooks/swr';
import { toast } from 'react-toastify';

import { User } from '@prisma/client';

const postComments = async (content: String, author: User, id: Number) => {
  const bubbleId = id;
  
  try {
    Mutate('/bubbles');
    Mutate(`/bubbles/${bubbleId}`);

    await api.post('/comments', {
      content,
      author,
      bubbleId,
    });

    Trigger('/bubbles');
    Trigger(`/bubbles/${bubbleId}`);

    toast.success('Comment registrated!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
  
  } catch {
    toast.error('Registration error! Please, reload the page and try again', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });

  };
};

export default postComments;