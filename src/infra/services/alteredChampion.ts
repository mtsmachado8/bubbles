import api from './api';
import { trigger } from '../hooks/swr';
import { toast } from 'react-toastify';

const alteredChampions = async (bubbleId: Number, userId: Number, isSelectedChampion: Boolean) => {
  try {
    await api.put(`/champions/${userId}`, {
      bubbleId,
      userId,
      isSelectedChampion,
    });

    trigger('/bubbles');
    trigger(`/bubbles/${bubbleId}`);

    toast.success('Champion altered!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });

  } catch {
    toast.error('Alteration error! Please, reload the page and try again', {
      autoClose: 2500,
      pauseOnFocusLoss:false,
      pauseOnHover: false,
    });
  };
};

export default alteredChampions;