import React from 'react';
import Helmet from 'react-helmet';
import { headerNavigation } from 'graphql/header-navigation';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import { RichText } from 'prismic-reactjs';

import { helmet } from 'utils/helmet';
import { Header } from 'components/header/Header';
import { Devtools } from 'components/devtools/Devtools';
import { Link } from 'components/link/Link';
import { linkResolver } from 'utils/linkResolver';
import s from './AppLayout.scss';
import { Navigation } from 'components/navigation/Navigation';
import { Footer } from 'components/footer/Footer';

interface IProps {
  children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === 'development';

export default ({ children }: IProps) => (
  <div className={s.layout}>
    <Helmet {...helmet} />

    <Header>
      <Query query={headerNavigation} variables={{
        lang: 'en-us',
      }}>
        {({ loading, error, data: { allHomepages } }) => {
          if (error) return <div>Error</div>

          const page = get(allHomepages, 'edges', [])[0];
          const nav = get(page, 'node.header_navigation', []);

          if (!nav && !loading) {
            return <Navigation />
          }

          return (
            <Navigation>
              {nav.map(({ header_link, link_title }, i: number) => (
                <Link key={`header-link-${i + 1}`} to={linkResolver(header_link)}>
                  {RichText.asText(link_title || [])}
                </Link>
              ))}
              <Link key="contact" to="/contact">Contact</Link>
            </Navigation>
          );
        }}
      </Query>
    </Header>

    {children}

    <Footer />

    {isDev && <Devtools />}
  </div>
)
