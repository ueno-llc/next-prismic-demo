import Prismic from 'prismic-javascript';
import React from 'react';

import { linkResolver } from '../utils/linkResolver';

interface IVariation {
  id: string;
  label: string;
  ref: string;
}

function qs(qs: string = '', delimiter: string = '&'): Map<string, string> {
  return new Map(
    qs.split(delimiter).map((item) => {
      const [key, value] = item.split('=').map((part) => decodeURIComponent(part.trim()));
      return [key, value] as [string, string];
    }),
  );
}

function getCookies() {
  return qs(document.cookie, ';');
}

export default class PreviewPage extends React.Component<any> {

  public url: URL | undefined;
  public qs = new Map();

  public state = {
    component: null,
  };

  public componentDidMount() {
    this.setup();
  }

  setup() {
    if (typeof window !== 'undefined') {
      this.url = new URL(window.location.toString());
      this.qs = qs(String(this.url.search).substr(1));
      this.preview();
    }
  }

  get config() {
    if (typeof window !== 'undefined') {
      const config = JSON.parse((document as any).getElementById('__NEXT_DATA__').innerText);
      return config.runtimeConfig || {};
    }
    return {};
  }

  public async preview() {
    const token = this.qs.get('token');
    const experiment = this.qs.get('experiment');
    const documentId = this.qs.get('documentId');

    // Expiration date of cookie
    const now = new Date();
    now.setHours(now.getHours() + 1);

    const api = await Prismic.getApi(this.config.prismicApi);

    if (token) {
      await api.previewSession(token, linkResolver, '/');
      document.cookie = `${Prismic.previewCookie}=${token}; expires=${now.toUTCString()}; path=/`;

      if (!documentId) {
        return this.redirect();
      }

      const doc = await api.getByID(documentId);

      return this.redirect(doc);
    } else if (experiment) {
      const runningVariations: IVariation[] = [];

      if (api.experiments.running && api.experiments.running.length) {
        runningVariations.concat(...api.experiments.running.map((experiment) => experiment.data.variations));
      }

      if (experiment && runningVariations.length) {
        const matchedVariation = runningVariations
          .find((variation) => variation.label.toLowerCase().replace(' ', '-') === experiment);

        if (matchedVariation) {
          document.cookie = `${Prismic.experimentCookie}=${matchedVariation.ref}; expires=${now.toUTCString()}; path=/`;
          this.redirect();
        }
      }
    } else if (documentId) {
      const cookies = getCookies();
      const doc = await api.getByID(documentId);
      const preview = cookies.has(Prismic.previewCookie) || cookies.has(Prismic.experimentCookie);
      this.redirect(preview && doc);
    }
  }

  public redirect = async (doc?: any) => {
    if (!doc) {
      (window as any).location = '/';
      return;
    }

    const link = linkResolver(doc);
    const exists = await fetch(link).then((res) => res.status) === 200;

    if (exists) {
      (window as any).location = link;
      return;
    }
  }

  public render() {
    return null;
  }
}
