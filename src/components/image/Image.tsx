import React from 'react';

import { ImageBlock } from './ImageBlock';

import s from './Image.scss';

interface IProps {
  width: number;
  height: number;
  alt: string;
  src: string;
  caption: any;
}

export const Image = ({ width, height, alt, src, caption }: IProps) => (
  <div className={s.image}>
    <div className={s.image__container}>
      <ImageBlock width={width} height={height} alt={alt} src={src} caption={caption} />
    </div>
  </div>
);
