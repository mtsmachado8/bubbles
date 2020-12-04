import api from './api';
import Router from 'next/router';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const alteredLabels = async (e, id, selectedLabel, oppenedBubbleId) => {
  e.preventDefault();

  const labelId = id;
  const bubbleId = oppenedBubbleId;
  const isSelectedLabel = selectedLabel;

  try {
    await api.put(`/labels/${labelId}`, {
      bubbleId,
      labelId,
      isSelectedLabel,
    });
    toast.success('Label altered!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });
    Router.reload();

  } catch {
    toast.error('Alteration error! Try again', {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
    Router.reload();
  };
};

export default alteredLabels;