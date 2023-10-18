import { MotionProps } from 'framer-motion';
import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
  hideProgressBar: true,
  autoClose: 2000,
  closeOnClick: true,
  closeButton: false,
};

export const defaultAnimationInAndOut: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
