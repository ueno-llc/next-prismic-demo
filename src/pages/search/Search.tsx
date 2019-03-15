import React from 'react';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { get, groupBy } from 'lodash';
import Error from 'next/error';
import { RichText } from 'prismic-reactjs';
import { search } from 'graphql/search';
import { withRouter } from 'next/router';
import queryString from 'query-string';
import Router from 'next/router';
import { linkResolver } from 'utils/linkResolver';

import { Results } from './components/results/Results';
import { Group } from './components/results/Group';
import { Item } from './components/results/Item';

interface IProps {
  q: string;
  router: any;
}

const Search = withRouter(({ router }: IProps) => {
  const [_, query] = router.asPath.split(/\?/);
  const { q } = queryString.parse(query);

  return (
    <>
      <Helmet title="Search" />

      <Query
        query={search}
        variables={{
          lang: 'en-us',
          q,
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return <div>Error</div>;
          }

          if (!data && !loading) {
            return <Error statusCode={404} />;
          }

          const groups = groupBy(
            get(data, '_allDocuments.edges', []),
            'node.__typename',
          );

          if (!q || String(q).trim() === '') {
            return null;
          }

          return (
            <Results
              query={String(q || '')}
              count={get(data, '_allDocuments.edges', []).length}
              onSearch={(value) => {
                const href = `/search?q=${value}`;
                const as = href;

                Router.push(href, as, { shallow: true });
              }}
            >
              {Object.keys(groups || {}).map((key) => (
                <Group
                  key={key}
                  title={key === 'Article' ? 'Articles' : 'Pages'}
                >
                  {[].concat((groups[key] as any) || []).map(({ node }: any) => {
                    return (
                      <Item
                        key={node._meta.uid}
                        to={linkResolver(node)}
                        title={
                          node.title
                            ? RichText.asText(get(node, 'title', []))
                            : undefined
                        }
                        text={RichText.render(
                          node.short_description ||
                            node.text ||
                            node.description_seo ||
                            [],
                          linkResolver,
                        )}
                      />
                    );
                  })}
                </Group>
              ))}
            </Results>
          );
        }}
      </Query>
    </>
  );
});

export default Search;
