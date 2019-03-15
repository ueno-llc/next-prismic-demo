import React from 'react';

import s from './List.scss';

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export const List = ({ children, isLoading }: IProps) => (
  <div className={s(s.list, { isLoading })}>
    <div className={s.list__container}>
      <ul className={s.list__list}>
        {children}
      </ul>
    </div>
  </div>
)