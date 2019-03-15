import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Cta.scss';

export class Cta extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.cta}>
        <div className={s.cta__container}>
          {children}
        </div>
      </div>
    );
  }
}
