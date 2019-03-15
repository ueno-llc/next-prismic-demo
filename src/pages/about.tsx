import React from 'react';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { RichText } from 'prismic-reactjs';
import { get, isEmpty } from 'lodash';
import Error from 'next/error'

import { aboutPage } from 'graphql/about';
import { linkResolver } from 'utils/linkResolver';
import { Slices } from 'containers/slices/Slices';
import { Intro } from 'components/intro/Intro';
import { Profiles } from 'components/profiles/Profiles';
import { Profile } from 'components/profiles/Profile';

export default () => (
  <>
    <Helmet title="About" />

    <Query query={aboutPage} variables={{
      lang: 'en-us',
    }}>
      {({ loading, error, data: { allAbouts } }) => {
        if (error) return <div>Error</div>
        const { node: page } = get(allAbouts, 'edges', [])[0] || {};

        console.log('about page', page);

        if (!page && !loading) {
          return <Error statusCode={404} />
        }


        return (
          <>
            <Intro isLoading={loading}>
              <h1>{RichText.asText(get(page, 'title', []))}</h1>
              <h2>{RichText.asText(get(page, 'subheading', []))}</h2>
              <div>{RichText.render(get(page, 'text', []), linkResolver)}</div>
            </Intro>

            <Profiles
              title={RichText.asText(get(page, 'people_title', []))}
            >
              {get(page, 'people', []).map(({ person }, i) => (
                <Profile
                  key={`profile-${i}`} // eslint-disable-line
                  image={get(person, 'image.url', '')}
                  name={!isEmpty(get(person, 'name', [])) && RichText.asText(get(person, 'name', []))}
                  description={!isEmpty(get(person, 'bio', [])) && RichText.render(get(person, 'bio', []), linkResolver)}
                />
              ))}
            </Profiles>

            <Slices data={get(page, 'body', [])} />
          </>
        )
      }}
    </Query>
  </>
);
