import api from './api';
import { useMutate, useTrigger } from '../hooks/useFetch';
import { toast } from 'react-toastify';

import { Label } from '@prisma/client';

const postLabels = async ({name, description, color}: Label, id: Number) => {
  const bubbleId = id;

  try {
    useMutate('/bubbles');

    await api.post('/labels', {
      name,
      description,
      color,
      bubbleId,
    });

    useTrigger('/bubbles');

    toast.success('Label registered!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    })

  } catch {
    toast.error('Registration error! Please, reload the page and try again', {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    })
  };
};

export default postLabels;