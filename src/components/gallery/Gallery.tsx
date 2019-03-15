import React from 'react';
import { isEmpty } from 'lodash';

import s from './Gallery.scss';

interface IProps {
  title: string;
  data: Array<any>;
}

export const Gallery = ({ title, data }: IProps) => (
  <div className={s.gallery}>
    <div className={s.gallery__container}>
      <div className={s.gallery_title}>
        <h1 className={s.gallery__name}>{title}</h1>
      </div>
      <div className={s.gallery__list}>
        {!isEmpty(data) && (
          data.map((item, i) => (
            <div key={i} className={s.gallery__item}>
              <img
                src={item.image.url}
                alt={item.caption}
              />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)