import React from 'react';
import { Query } from 'react-apollo';
import { RichText } from 'prismic-reactjs';
import { footerNavigation } from 'graphql/footer-navigation';
import { get } from 'lodash';
import Error from 'next/error'
import Logo from 'assets/svg/logo.svg';
import { SearchBar } from 'components/search-bar/SearchBar';
import { linkResolver } from 'utils/linkResolver';

import { Link } from 'components/link/Link';

import s from './Footer.scss';

interface IFooterLink {
  link_title: string;
  footer_link: {
    __typename: string;
    _meta: {
      uid: string;
    }
  }
}

const social = [
  { text: 'Twitter', url: 'http://twitter.com' },
  { text: 'Facebook', url: 'http://facebook.com' },
];

export const Footer = () => (
  <footer className={s.footer}>
    <div className={s.footer__container}>
      <div className={s.footer__row}>
        <div className={s.footer__logo}>
          <Logo />
          <div className={s.footer__search}>
            <SearchBar />
          </div>
        </div>

        <Query query={footerNavigation} variables={{
          lang: 'en-us',
        }}>
          {({ loading, error, data: { allHomepages } }) => {
            if (error) return <div>Error</div>

            const page = get(allHomepages, 'edges', [])[0];
            const nav = get(page, 'node.footer_navigation', []);

            if (!nav && !loading) {
              return <Error statusCode={404} />
            }

            return (
              <div className={s.footer__navigation}>
                <ul className={s.footer__list}>
                  {nav.map(({ footer_link, link_title }: IFooterLink, i: number) => (
                    <li key={`footer-link-${i + 1}`} className={s.footer__item}>
                      <Link to={linkResolver(footer_link)} className={s.footer__link}>{RichText.asText(link_title || [])}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }}
        </Query>

          <div className={s.footer__social}>
            <ul className={s.footer__list}>
              {social.map(c => (
                <li key={c.text} className={s.footer__item}>
                  <a className={s.footer__link} href={c.url}>{c.text}</a>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  </footer>
)
