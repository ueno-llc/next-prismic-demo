/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react';

import s from './Video.scss';

interface IProps {
  url: string;
  caption: React.ReactNode;
}

export const VideoBlock = ({ url, caption }: IProps) => (
  <figure className={s.video__figure}>
    <video
      className={s.video__tag}
      src={url}
      height={574}
      autoPlay
      muted
      controls
      loop
    />
    {caption && (
      <figcaption className={s.video__caption}>{caption}</figcaption>
    )}
  </figure>
)