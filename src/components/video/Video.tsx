import React from 'react';

import s from './Video.scss';

import { VideoBlock } from './VideoBlock';

interface IProps {
  url: string;
  caption: React.ReactNode;
}

export const Video = ({ url, caption }: IProps) => (
  <div className={s.video}>
    <div className={s.video__container}>
      <VideoBlock url={url} caption={caption} />
    </div>
  </div>
)
