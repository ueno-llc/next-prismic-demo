import React from 'react';

import s from './Image.scss';

interface IProps {
  width: number;
  height: number;
  alt: string;
  src: string;
  caption: any;
}

export const ImageBlock = ({ width, height, alt, src, caption }: IProps) => (
  <figure className={s.image__figure}>
    <img className={s.image__img} src={src} alt={alt} width={width} height={height} />
    {caption && (
      <figcaption className={s.image__caption}>{caption}</figcaption>
    )}
  </figure>
);