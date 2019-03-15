// @ts-ignore
require('dotenv').config();

const path = require('path');
const sass = require('@zeit/next-sass');
const typescript = require('@zeit/next-typescript');
const plugins = require('next-compose-plugins');
const images = require('next-images');
const reactSvg = require('next-react-svg');
const { ApolloClient, HttpLink, InMemoryCache } = require('apollo-boost');
const gql = require('graphql-tag');
const fetch = require('isomorphic-unfetch');
const { PrismicLink } = require('apollo-link-prismic');
const { omit } = require('lodash');

global.fetch = fetch;

const nextConfig = {
  serverRuntimeConfig: {
    /*
     * Will only be available on the server side
     * Use `import { config } from 'utils/config';`
     */
  },

  async exportPathMap(pages) {
    const config = nextConfig.publicRuntimeConfig;

    const client = new ApolloClient({
      link: PrismicLink({
        uri: config.prismicGraphqlApi,
        accessToken: config.prismicAccessToken,
      }),
      cache: new InMemoryCache(),
    });

    // fetch articles and products
    const query = gql`
      query generatePages {
        allArticles {
          edges {
            node {
              _meta {
                uid
              }
            }
          }
        }
        allProducts {
          edges {
            node {
              _meta {
                uid
              }
            }
          }
        }
        allCustom_pages {
          edges {
            node {
              _meta {
                uid
              }
            }
          }
        }
      }
    `;

    const res = await client.query({
      query,
    });

    const articles = [].concat(res.data && res.data.allArticles.edges || []).reduce((acc, { node }) => {
      acc[`/articles/${node._meta.uid}`] = { page: '/article', query: { uid: node._meta.uid } };
      return acc;
    }, {});

    const products = [].concat(res.data && res.data.allProducts.edges || []).reduce((acc, { node }) => {
      acc[`/products/${node._meta.uid}`] = { page: '/product', query: { uid: node._meta.uid } };
      return acc;
    }, {});
  
    const customPages = [].concat(res.data && res.data.allCustom_pages.edges || []).reduce((acc, { node }) => {
      acc[`/${node._meta.uid}`] = { page: '/page', query: { uid: node._meta.uid } };
      return acc;
    }, {});
    
    const mapping = omit({
      ...pages,
      ...articles,
      ...products,
      ...customPages,
      '/articles': { page: '/articles' },
      '/products': { page: '/products' },
    }, ['/article', '/product', '/index', '/page']);

    return mapping;
  },

  publicRuntimeConfig: {
    /*
     * Will be available on both server and client
     * Use `import { config } from 'utils/config';`
     */
    prismicGraphqlApi: process.env.PRISMIC_GRAPHQL_API,
    prismicApi: process.env.PRISMIC_API_URL,
    prismicAccessToken: process.env.PRISMIC_ACCESS_TOKEN,
  },

  webpack(config) {
    const classNamesLoader = require.resolve('next-classnames-loader');
    const styleRules = config.module.rules.filter(rule => rule.test.test('file.scss') || rule.test.test('file.sass'));

    styleRules.forEach(styleRule => {
      if (styleRule.use && styleRule.use.indexOf(classNamesLoader) === -1) {
        styleRule.use.splice(0, 0, classNamesLoader);
      }
    });

    config.resolve = config.resolve || {};

    config.resolve.modules = [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ];

    return config;
  },
};

module.exports = plugins([
  [sass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
  }],

  [images, { exclude: path.resolve(__dirname, 'src/assets/svg') }],
  [reactSvg, { include: path.resolve(__dirname, 'src/assets/svg') }],

  typescript,
], nextConfig);
