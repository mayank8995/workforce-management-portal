import { useEffect, useRef, useState } from 'react';
import type { ScreenType } from '../types/types';
/**
    sm	40rem (640px)	@media (width >= 40rem) { ... }
    md	48rem (768px)	@media (width >= 48rem) { ... }
    lg	64rem (1024px)	@media (width >= 64rem) { ... }
    xl	80rem (1280px)	@media (width >= 80rem) { ... }
    2xl	96rem (1536px)
 */

function getScreenType(size: number) {
  if (size < 768) {
    return 'sm';
  } else if (size >= 768 && size < 1024) {
    return 'md';
  } else if (size >= 1024 && size < 1280) {
    return 'lg';
  } else if (size >= 1280 && size < 1536) {
    return 'xl';
  }
  return '2xl';
}
const useScreenType = () => {
  const [screenType, setScreenType] = useState<ScreenType>(() =>
    getScreenType(window.innerWidth ?? 0)
  );
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // const onResize = () => {
    //   setScreenType(getScreenType(window.innerWidth));
    // };
    const onResize = () => {
      setScreenType(getScreenType(window.innerWidth));
    };
    const debouncedHandleResize = () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(onResize, 300);
    };
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, []);
  return { screenType };
};

export default useScreenType;
