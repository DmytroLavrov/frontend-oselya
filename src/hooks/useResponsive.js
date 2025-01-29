import { useState, useEffect } from 'react';

export const useResponsive = (breakpoint = 640, operator = '<=') => {
  const [isMatchingScreenSize, setIsMatchingScreenSize] = useState(false);

  const checkSize = () => {
    switch (operator) {
      case '<':
        return window.innerWidth < breakpoint;
      case '<=':
        return window.innerWidth <= breakpoint;
      case '>':
        return window.innerWidth > breakpoint;
      case '>=':
        return window.innerWidth >= breakpoint;
      case '==':
        return window.innerWidth === breakpoint;
      default:
        return window.innerWidth <= breakpoint; // Default behavior (<=)
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMatchingScreenSize(checkSize());
    };

    window.addEventListener('resize', handleResize);

    setIsMatchingScreenSize(checkSize());

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint, operator]);

  return isMatchingScreenSize;
};
