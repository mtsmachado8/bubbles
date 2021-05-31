import api from './api';
import { trigger } from '../hooks/swr';
import { toast } from 'react-toastify';

const alteredLikes = async (bubbleId: Number, author: Object, id: Number) => {
  if(!author)
    return toast.error('You need to be logged in to like it.', {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  if(!bubbleId)
    return toast.error(`Couldn't find a bubble to like. Please try again`, {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  if(id) {
    try {
      await api.remove(`/likes/${id}`);

      trigger('/bubbles');
      trigger(`/bubbles/${bubbleId}`);
    } catch {
      toast.error("Couldn't unlike bubble! Please, reload the page and try again", {
        autoClose: 2500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    };
  } else {
    try {
      await api.post('/likes', {
        bubbleId,
        author,
      });

      trigger('/bubbles');
      trigger(`/bubbles/${bubbleId}`);
  
    } catch {
      toast.error("Couldn't like bubble! Please, reload the page and try again", {
        autoClose: 2500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    };
  }
};

export default alteredLikes;