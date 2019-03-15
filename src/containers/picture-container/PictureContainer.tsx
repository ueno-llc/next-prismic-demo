import React from 'react';
import { get } from 'lodash';

import { Picture } from 'components/picture/Picture';

interface View {
  url: string;
  alt: string
}

interface IPicture {
  url: string;
  alt: string;
  dimensions: {
    width: string;
    height: string;
  };
  desktop: View;
  desktop_2x: View;
  tablet: View;
  tablet_2x: View;
  mobile: View;
  mobile_2x: View;
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
)
