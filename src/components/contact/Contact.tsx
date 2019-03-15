import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ContactBlock } from './Block';

import s from './Contact.scss';

export class Contact extends PureComponent {

  static propTypes = {
    target: PropTypes.string,
    responseText: PropTypes.string,
    responseTitle: PropTypes.string,
  }

  render() {
    const { target, responseText, responseTitle } = this.props;

    return (
      <div className={s.contact}>
        <div className={s.contact__container}>
          <div className={s.contact__row}>
            <div className={s.contact__col}>
              <ContactBlock
                target={target}
                responseText={responseText}
                responseTitle={responseTitle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
