import { toast } from 'react-toastify';

export const showSuccessToast = (message,time=3000) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: time,
    hideProgressBar: false,
  });
};

export const showErrorToast = (message,time=3000) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: time,
    hideProgressBar: false,
  });
};

// You can define more functions for different types of toasts as needed
