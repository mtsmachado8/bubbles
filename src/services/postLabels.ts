import api from './api';
import Router from 'next/router';
import { toast } from 'react-toastify';

const postLabels = async (newLabel, oppenedBubbleId) => {
  const name = newLabel.name;
  const description = newLabel.description;
  const color = newLabel.color;
  const bubbleId = oppenedBubbleId;

  try {
    await api.post('/labels', {
      name,
      description,
      color,
      bubbleId,
    });
    toast.success('Label registered!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    })
    Router.reload();

  } catch {
    toast.error('Registration error! Try again', {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    })
    Router.reload();
  };
};

export default postLabels;