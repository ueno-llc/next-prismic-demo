import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Column.scss';

export class Column extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.node,
  }

  render() {
    const { title, text } = this.props;

    return (
      <div className={s.column}>
        <h3 className={s.column__title}>{title}</h3>
        <div className={s.column__text}>{text}</div>
      </div>
    );
  }
}
