import * as React from 'react';

interface ISizes {
  width: number;
  height: number;
}

export const useResize = () => {
  const [sizes, setSizes] = React.useState<ISizes>({ width: 0, height: 0 });
  const [isMobile, setMobile] = React.useState<boolean>(false);

  const onResize = () => {
    if (typeof window === undefined) {
      return;
    }

    setSizes({ width: window.innerWidth, height: window.innerHeight });
    setMobile(window.matchMedia('(max-width: 960px)').matches);
  };

  React.useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return {
    isMobile,
    sizes,
  };
};