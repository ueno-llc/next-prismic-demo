import React from 'react';

import s from './Intro.scss';

interface IProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Intro = ({ children, isLoading }: IProps) => {

  const loadingContent = () => {
    return (
      <div>
        <h1>Loading Loding </h1>
        <h1>Loading Loa ding</h1>
        <h2>ding Loading </h2>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading Loading Loading Loading</p>
        <p>Loading Loading Loading</p>
      </div>
    );
  }

  return (
    <div className={s(s.intro, { isLoading })}>
      <div className={s.intro__container}>
        <div className={s.intro__row}>
          <div className={s.intro__col}>
            {isLoading ? (loadingContent())
              : (children)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
