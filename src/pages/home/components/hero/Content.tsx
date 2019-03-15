import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { TweenLite, TimelineLite } from 'gsap';

import s from './Content.scss';

interface IProps {
  title: string;
  text: string;
}

const DURATION = 700;

export const Content = (props: IProps) => {

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!titleRef.current || !textRef.current) return;

    t.staggerFromTo(
      [titleRef.current, textRef.current],
      DURATION / 1000,
      { alpha: 0 },
      { alpha: 1, ease },
      0.15,
      '+=0.2',
    );
  }

  const onEntering = () => {
    if (!contentRef.current) return;

    TweenLite.set(contentRef.current, {
      position: 'absolute',
      zIndex: '1',
    });
  }

  const onExiting = () => {
    TweenLite.set(contentRef.current, {
      position: 'absolute',
      zIndex: '0',
    });
  }

  const onExit = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!titleRef.current || !textRef.current) return;

    t.fromTo(
      [textRef.current, titleRef.current],
      0.3,
      { alpha: 1 },
      { alpha: 0, ease },
    );
  }

  return (
    <Transition
      {...props}
      timeout={DURATION}
      onEnter={onEnter}
      onEntering={onEntering}
      onExit={onExit}
      onExiting={onExiting}
    >
      <div className={s.content} ref={contentRef}>
        <h1
          className={s.content__title}
          ref={titleRef}
        >
          {props.title}
        </h1>

        <div
          className={s.content__text}
          ref={textRef}
        >
          {props.text}
        </div>
      </div>
    </Transition>
  )
}
