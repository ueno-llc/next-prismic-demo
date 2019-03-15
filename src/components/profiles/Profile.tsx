import React from 'react';

import s from './Profile.scss';

interface IProps {
  image: string;
  name: string;
  description: string;
}

export const Profile = ({ image, name, description }: IProps) => (
  <div className={s.profile}>
    <div className={s.profile__mask}>
      <img src={image} alt={name} className={s.profile__image} />
    </div>

    <h2 className={s.profile__name}>{name}</h2>
    <div className={s.profile__description}>{description}</div>
  </div>
)