import React from 'react';

import s from './Heading.scss';

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export const Heading = ({ children, isLoading }: IProps) => (
  <div className={s(s.heading, { isLoading })}>
    <div className={s.heading__container}>
      <div className={s.heading__row}>
        <div className={s.heading__col}>
          <h1>
            {children}
          </h1>
        </div>
      </div>
    </div>
  </div>
);