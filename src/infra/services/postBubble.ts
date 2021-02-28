import api from './api';
import { trigger } from '../hooks/swr';
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

    trigger('/bubbles');
    
    toast.success('Bubble successfully registered!', {
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

export default postBubble;