import React from 'react';

import s from './Quote.scss';

interface IProps {
  text: string;
}

export const Quote = ({ text }: IProps) => (
  <div className={s.quote}>
    <div className={s.quote__container}>
      <div className={s.quote__row}>
        <div className={s.quote__col}>
          <blockquote className={s.quote__block}>
            {text}
          </blockquote>
        </div>
      </div>
    </div>
  </div>
);

