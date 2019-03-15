import React from 'react';
import { Link } from 'components/link/Link';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import { RichText } from 'prismic-reactjs';
import { AuthorBlock } from 'components/author/AuthorBlock';
import { linkResolver } from 'utils/linkResolver';

import s from './Articles.scss';

export const Articles = ({ title, subheading, articles, show }) => (
  <div className={s.articles}>
    <div className={s.articles__container}>
      <div className={s.articles__row}>
        <div className={s.articles__header}>
          <h2 className={s.articles__headerTitle}>{title}</h2>
          <h2 className={s.articles__headerTitle}>{subheading}</h2>
        </div>

        {articles && (
          <ul className={s.articles__list}>
            {articles.slice(0, show).map(({ article = {} }) => {
              const { _meta: { id, uid }, title, short_description, author, publication_date } = article;

              const itemTitle = RichText.asText(title);

              if (!uid || !itemTitle) {
                return null;
              }

              const url = `/articles/${uid}`;
              const description = RichText.asText(short_description);
              const date = publication_date;

              return (
                <li
                  className={s.articles__item}
                  key={`article-${uid}`}
                >
                  <Link className={s.articles__link} to={url}>
                    {date && (
                      <div className={s.articles__date}>{format(date, 'DD MMMM')}</div>
                    )}

                    <div className={s.articles__inner}>
                      <div className={s.articles__lead}>
                        <h2 className={s.articles__title}>{itemTitle}</h2>
                        {!isEmpty(author) && (
                          <div className={s.articles__author}>
                            <AuthorBlock
                              name={RichText.asText(author.name)}
                              bio={RichText.render(author.bio, linkResolver)}
                              image={author.image.thumb}
                            />
                          </div>
                        )}
                      </div>
                      <div className={s.articles__description}>{description}</div>
                      <span className={s.articles__button}>Read more</span>
                    </div>
                  </Link>
                </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  </div>
)