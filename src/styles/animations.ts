import { keyframes } from 'styled-components';

export const LoadElement = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const ActiveNav = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;
export const lazyLoadAside = (index: number) => {
  const calculatedDelay = index * 0.05;
  return {
    offscreen: {
      opacity: 0,
      x: -8,
      transition: {
        type: 'spring',
        stiffness: 300, // ความแข็งของสปริง
        damping: 10, // ความหนืด
        mass: 1, // มว
        delay: calculatedDelay,
      },
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300, // ความแข็งของสปริง
        damping: 10, // ความหนืด
        mass: 1, // มว
        delay: calculatedDelay,
      },
    },
  };
};
