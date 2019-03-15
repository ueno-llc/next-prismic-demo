import React from 'react';

import s from './Tweet.scss';

interface IProps {
  authorName: string;
  url: string;
  title: string;
}

function tweetFromTitle(name: string, title: string) {
  return title.replace(`${name} on Twitter: "`, '').slice(0, -1);
}

export const Tweet = ({ authorName, title, url }: IProps) => (
  <div className={s.tweet}>
    <div className={s.tweet__container}>
      <div className={s.tweet__row}>
        <div className={s.tweet__col}>
          <blockquote className={s(s.tweet__block, 'twitter-tweet')}>
            <p className={s.tweet__text} lang="en" dir="ltr">{tweetFromTitle(authorName, title)}</p>
            &mdash; <a className={s.tweet__url} href={url}>{authorName}</a>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
)
