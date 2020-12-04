import api from './api';
import Router from 'next/router';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const postComments = async (e, newComment, userInfo, oppenedBubbleId) => {
  e.preventDefault();

  const content = newComment;
  const author = userInfo;
  const bubbleId = oppenedBubbleId;

  try {
    await api.post('/comments', {
      content,
      author,
      bubbleId,
    });
    toast.success('Comment registrated!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
    Router.reload();
  
  } catch {
    toast.error('Registration error! Try again', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
    Router.reload();
  };
};

export default postComments;