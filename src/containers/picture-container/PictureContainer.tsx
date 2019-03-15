import React from 'react';
import { get } from 'lodash';

import { Picture } from 'components/picture/Picture';

interface IView {
  url: string;
  alt: string;
}

interface IPicture {
  url: string;
  alt: string;
  dimensions: {
    width: string;
    height: string;
  };
  desktop: IView;
  desktop_2x: IView;
  tablet: IView;
  tablet_2x: IView;
  mobile: IView;
  mobile_2x: IView;
}

interface IProps {
  image: IPicture;
}

export const PictureContainer = ({ image }: IProps) => (
  <Picture
    mobileView={get(image, 'mobile')}
    mobileView2x={get(image, 'mobile_2x')}
    tabletView={get(image, 'tablet')}
    tabletView2x={get(image, 'tablet_2x')}
    mainView={get(image, 'desktop')}
    mainView2x={get(image, 'desktop_2x')}
  />
);
