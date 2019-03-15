import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ContactForm } from './Form';

import s from './Contact.scss';

export class ContactBlock extends PureComponent {

  static propTypes = {
    target: PropTypes.string,
    responseText: PropTypes.string,
    responseTitle: PropTypes.string,
  }

  state = {
    success: false,
  }

  onSend = (form) => {
    const { target } = this.props;

    fetch(target, {
      method: 'POST',
      body: form,
    }).then((res) => {
      if (res.status === 200) { // success
        this.setState({ success: true });
      }
    });
  }

  render() {
    const { responseText, responseTitle } = this.props;
    const { success } = this.state;

    return (
      <div className={s.contact__block}>
        {success ? (
          <div className={s.contact__response}>
            <h2 className={s.contact__responseTitle}>{responseTitle}</h2>
            <p className={s.contact__responseText}>{responseText}</p>
          </div>
        ) : (
          <ContactForm onSend={this.onSend} />
        )}
      </div>
    );
  }
}
