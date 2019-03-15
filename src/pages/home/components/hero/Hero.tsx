import React, { useState, useRef } from 'react';
import { TimelineLite } from 'gsap';
import { TransitionGroup } from 'react-transition-group';
import { RichText } from 'prismic-reactjs';

import { Content } from './Content';
import s from './Hero.scss';

interface IProps {
  carousel: Array<any>;
}
export const Hero = (props: IProps) => {
  const { carousel } = props;
  const heroRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const changeSlide = (index: number, color: string) => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!heroRef.current) return

    t.to(heroRef.current, 0.6, {
      backgroundColor: color,
      ease,
    });

    setCurrent(index);
  }

  return (
    <div className={s.hero} ref={heroRef}>
      <div className={s(s.hero__container, s.hero__top)}>
        <div className={s.hero__row}>
          {carousel && (
            <TransitionGroup className={s.hero__content} component="div">
              <Content
                key={`content-slide-${current}`}
                title={RichText.asText(carousel[current].title)}
                text={RichText.asText(carousel[current].text)}
              />
            </TransitionGroup>
          )}
        </div>
      </div>

      <div className={s.hero__container}>
        <ul className={s.hero__pagination}>
          {carousel && carousel.map((_, i) => (
            <li // eslint-disable-line
              onClick={() => changeSlide(i, carousel[i].color)}
              className={s(s.hero__item, { active: current === i })}
              key={`pagination-item-${i}`} // eslint-disable-line
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
