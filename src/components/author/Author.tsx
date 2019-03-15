import React from 'react';
import { AuthorBlock } from './AuthorBlock';

import s from './Author.scss';


interface IProps {
  name: string;
  bio: React.ReactNode;
  image: any;
  isLoading: boolean;
}
export const Author = ({ name, bio, image, isLoading }: IProps) => (
  <div className={s(s.author, { isLoading })}>
    <div className={s.author__container}>
      <div className={s.author__row}>
        <div className={s.author__col}>
          <div className={s.author__block}>
            <AuthorBlock name={name} bio={bio} image={image} />
          </div>
        </div>
      </div>
    </div>
  </div>
);