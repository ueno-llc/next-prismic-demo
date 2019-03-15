import React, { useEffect, useRef } from 'react';
import { TimelineLite } from 'gsap';
import { Transition } from 'react-transition-group';

import s from './Mobile.scss';

interface IProps {
  children?: React.ReactNode;
}

export const Mobile = ({ children, ...props }: IProps) => {

  const navRef = useRef<HTMLDivElement>(null);

  const endHandler = (n: any, done: any) => {
    const t = new TimelineLite();

    if (!navRef.current) return;


    if (props.in) {
      t.addLabel('start');

      t.set(
        document.querySelector('html'),
        { overflow: 'hidden' },
      );

      t.fromTo(
        navRef.current,
        0.4,
        {
          x: '100%',
        },
        {
          x: '0%',
          ease: 'Power4.easeInOut',
        },
        'start',
      );
    } else {
      t.addLabel('start');

      t.set(
        document.querySelector('html'),
        { overflow: '' },
      );

      t.to(
        navRef.current,
        0.4,
        {
          x: '100%',
          ease: 'Power4.easeInOut',
        },
        'start',
      );
    }
  }

  return (
    <Transition {...props} addEndListener={endHandler}>
      <div ref={navRef} className={s.mobile}>
        <div className={s.mobile__container}>
          {children}
        </div>
      </div>
    </Transition>
  );
}
