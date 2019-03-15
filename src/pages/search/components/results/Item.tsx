import React from 'react';
import { Link } from 'components/link/Link';

import s from './styles.scss';

interface IProps {
  title: string;
  to: string;
  text: string;
}

export const Item = ({ title, to, text }: IProps) => (
  <div className={s.item}>
    <Link className={s.item__link} to={to}>{title}</Link>
    <p className={s.item__text}>{text}</p>
  </div>
)