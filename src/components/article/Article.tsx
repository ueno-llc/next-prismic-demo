import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';

import { Slices } from 'containers/slices/Slices';
import s from './Article.scss';


interface IProps {
  children: React.ReactElement<any>;
}

const slicesType = (<Slices data={{}} />).type;

export const Article = ({ children }: IProps) => (
  <div className={s.article}>
    {Children.map(children, (child, i) => {
      if (!child) {
        return null;
      }
      const { type } = child;

      if (type === slicesType) {
        return cloneElement(child, {
          className: s.article__slices,
          key: i,
        });
      }

      return React.cloneElement(child);
    })}
  </div>
);