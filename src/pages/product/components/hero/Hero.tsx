import React from 'react';
import { PictureContainer } from 'containers/picture-container/PictureContainer';

import s from './Hero.scss';

interface IProps {
  image: object;
  name: string;
  description: string;
  loading: boolean;
}

export const Hero = ({ image, name, description, loading }: IProps) => (
  <div className={s(s.hero, { isLoading: loading })}>
    <div className={s.hero__container}>
      <div className={s.hero__title}>
        <h1 className={s.hero__name}>{name}</h1>
      </div>
      <div className={s.hero__image}>
        <PictureContainer
          image={image}
        />
      </div>
      <div className={s.hero__detail}>
        <div className={s.hero__description}>{description}</div>
      </div>
    </div>
  </div>
)