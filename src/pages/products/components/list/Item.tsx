import React from 'react';
import { Link } from 'components/link/Link';

import s from './List.scss';

interface IProps {
  url: string;
  title: string;
  description: string;
  src: string;
  isLoading: boolean;
}

export const Item = ({ url, title, description, src, isLoading }: IProps) => (
  <li className={s(s.list__item, { isLoading })}>
    <Link to={url} className={s.list__block}>
      <div className={s.articelList__top}>
        <div className={s.list__image}>
          {src && (<img src={src} alt="" />)}
        </div>
      </div>
      <div className={s.list__middle}>
        <div className={s.list__title}>{title}</div>
        <div className={s.list__description}>{description}</div>
      </div>
    </Link>
  </li>
)