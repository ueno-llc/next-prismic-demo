const express = require('express');
const next = require('next');
const Prismic = require('prismic-javascript');
const Cookies = require('cookies');
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const prismicApiEndpoint = process.env.PRISMIC_API_URL;
const { linkResolver } = require('../src/utils/linkResolver');

app.prepare()
.then(() => {
  const server = express();

  server.get('/preview', async (req, res) => {
    const { token, documentId } = req.query;
    try {
      const api = await Prismic.getApi(prismicApiEndpoint, {
        req: req
      });
      await api.previewSession(token, linkResolver, '/');
      const cookies = new Cookies(req, res);

      const doc = await api.getByID(documentId);
      const url = linkResolver(doc);

      cookies.set(Prismic.previewCookie, token, {
        maxAge: 30 * 60 * 1000,
        path: '/',
        httpOnly: false
      });

      res.redirect(302, url);
    } catch (error) {
      res.json({ error });
    }
  });

  server.get('/', (req, res) => {
    const actualPage = '/'
    app.render(req, res, actualPage)
  })

  server.get('/about', (req, res) => {
    const actualPage = '/about'
    app.render(req, res, actualPage)
  })

  server.get('/contact', (req, res) => {
    const actualPage = '/contact'
    app.render(req, res, actualPage)
  })

  server.get('/articles', (req, res) => {
    const actualPage = '/articles'
    app.render(req, res, actualPage)
  })

  server.get('/products', (req, res) => {
    const actualPage = '/products'
    app.render(req, res, actualPage)
  })

  server.get('/articles/:uid', (req, res) => {
    const actualPage = '/article'
    const { uid, lang} = req.params;

    app.render(req, res, actualPage, { uid })
  })

  server.get('/products/:uid', (req, res) => {
    const actualPage = '/product'
    const { uid } = req.params;

    app.render(req, res, actualPage, { uid })
  })

  server.get('/search', (req, res) => {
    const actualPage = '/search'

    app.render(req, res, actualPage)
  })

  server.get('/:uid', (req, res) => {
    const actualPage = '/page'
    const { uid } = req.params;

    app.render(req, res, actualPage, { uid })
  })

  // server.use(`/:lang(${lngs})`, createLocalizedRoutes(app))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
