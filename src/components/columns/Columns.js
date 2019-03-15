import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Columns.scss';

export class Columns extends PureComponent {
  static propTypes = {
    heading: PropTypes.string,
    subline: PropTypes.string,
    children: PropTypes.node,
    isLoading: PropTypes.bool,
  }

  loadingContent() {
    return (
      <div>
        <span className={s.columns__h1} />
        <span className={s.columns__h2} />
        <ul className={s.columns__list}>
          <li className={s.columns__item}>
            <span className={s.columns__h3} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
          </li>
          <li className={s.columns__item}>
            <span className={s.columns__h3} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
          </li>
          <li className={s.columns__item}>
            <span className={s.columns__h3} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
            <span className={s.columns__p} />
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const { heading, subline, children, isLoading } = this.props;

    return (
      <div className={s(s.columns, { isLoading })}>
        <div className={s.columns__container}>
          {isLoading ? (this.loadingContent()) : (
            <div>
              <h2 className={s.columns__heading}>{heading}</h2>
              <h2 className={s.columns__heading}>{subline}</h2>
              <ul className={s.columns__list}>
                {React.Children.map(children, (c, i) => (
                  <li key={i} className={s.columns__item}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
