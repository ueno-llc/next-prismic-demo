import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';
import { Fragment } from 'react';
import { config } from 'utils/config';

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
          endpoint: '${config.prismicApi}'
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
