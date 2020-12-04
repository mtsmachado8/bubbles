import api from './api';
import Router from 'next/router';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const postLabels = async (e, newLabel, oppenedBubbleId) => {
  e.preventDefault();

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