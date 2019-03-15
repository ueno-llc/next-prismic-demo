import React from 'react';

import s from './Text.scss';

interface IProps {
  text: Array<any>;
}

export const Text = ({ text }: IProps) => (
  <div className={s.text}>
    <div className={s.text__container}>
      <div className={s.text__row}>
        <div className={s.text__col}>
          {text}
        </div>
      </div>
    </div>
  </div>
);
