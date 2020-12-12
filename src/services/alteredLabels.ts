import api from './api';
import { toast } from 'react-toastify';

const alteredLabels = async (labelId: Number, isSelectedLabel: Boolean, bubbleId: Number) => {
  try {
    await api.put(`/labels/${labelId}`, {
      labelId,
      bubbleId,
      isSelectedLabel,
    });
    toast.success('Label altered!', {
      autoClose: 2500,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
    });

  } catch {
    toast.error('Alteration error! Please, reload the page and try again', {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
};

export default alteredLabels;