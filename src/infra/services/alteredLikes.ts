import api from './api';
import { trigger } from '../hooks/swr';
import { toast } from 'react-toastify';

const alteredLabels = async (bubbleId: Number, author: Object, id: Number) => {
  if(author) {
    if(bubbleId) {
      if(id) {
        try {
          await api.remove(`/likes/${id}`);
    
          trigger('/bubbles');
          trigger(`/bubbles/${bubbleId}`);
        } catch {
          toast.error('Alteration error! Please, reload the page and try again', {
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
          toast.error('Alteration error! Please, reload the page and try again', {
            autoClose: 2500,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
          });
        };
      };
    } else {
      toast.error('You have to get into a Bubble.', {
        autoClose: 2500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    }
  } else {
    toast.error('You need to be logged in to like it.', {
      autoClose: 2500,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  };
};

export default alteredLabels;