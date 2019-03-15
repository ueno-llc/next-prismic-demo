import React from 'react';

import s from './styles.scss';

interface IProps {
  children: React.ReactNode;
  title: string;
}

export const Group = ({ title, children }: IProps) => (
  <div className={s.group}>
    <h2 className={s.group__heading}>{title}</h2>
    {children}
  </div>
)