import React from 'react';
import { get } from 'lodash';
import s from './Picture.scss';

interface View {
  url: string;
  alt: string
}

interface IProps {
  mobileView?: View;
  mobileView2x?: View;
  tabletView?: View;
  tabletView2x?: View;
  mainView?: View;
  mainView2x?: View;
}

export const Picture = (props: IProps) => {

  const makeSrcSet = (src = '', src2x = '') => {
    if (src2x !== '') {
      return `${src} 1x, ${src2x} 2x`;
    }

    return undefined;
  }

  const {
    mobileView = {},
    mobileView2x = {},
    tabletView = {},
    tabletView2x = {},
    mainView = {},
    mainView2x = {},
  } = props;

  return (
    <picture className={s.picture}>
      <source media="(max-width: 719px)" srcSet={makeSrcSet(get(mobileView, 'url', ''), get(mobileView2x, 'url', ''))} />
      <source media="(max-width: 1079px)" srcSet={makeSrcSet(get(tabletView, 'url', ''), get(tabletView2x, 'url', ''))} />
      <source srcSet={makeSrcSet(get(mainView, 'url', ''), get(mainView2x, 'url', ''))} />
      <img src={get(mainView, 'url', '')} alt={get(mainView, 'alt', '')} />
    </picture>
  );
}
