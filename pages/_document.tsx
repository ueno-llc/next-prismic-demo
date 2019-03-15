import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';
import { Fragment } from 'react';
import { PRISMIC_API_URL } from '../config';

interface IProps {
  isProduction: boolean;
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx: NextDocumentContext) {
    const isProduction = process.env.NODE_ENV === 'production';
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, isProduction };
  }

  setPrismic() {
    return {
      __html: `
        window.prismic = {
          endpoint: '${PRISMIC_API_URL}'
        }
      `
    };
  }

  render() {
    const { isProduction } = this.props;
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {!isProduction && (
            <Fragment>
              <script dangerouslySetInnerHTML={this.setPrismic()} />
              <script
                type="text/javascript"
                src="//static.cdn.prismic.io/prismic.min.js"
              />
            </Fragment>
          )}
        </body>
      </html>
    );
  }
}
