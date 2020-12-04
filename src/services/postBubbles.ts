import api from './api';
import Router from 'next/router';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const postBubble = async (e, bubbleInfo, userInfo) => {
  e.preventDefault();

  const title = bubbleInfo.title;
  const description = bubbleInfo.description;
  const content = bubbleInfo.content
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

export default postBubble;