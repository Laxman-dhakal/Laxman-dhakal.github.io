import { useLayoutEffect } from 'react';

const useLockBodyScroll = (locked) => {
  useLayoutEffect(() => {
    if (!locked) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
};

export default useLockBodyScroll;
