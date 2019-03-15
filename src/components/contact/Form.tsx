import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/button/Button';

import { Input } from './Input';
import s from './Form.scss';

export class ContactForm extends PureComponent {

  static propTypes = {
    onSend: PropTypes.func,
  }

  state = {
    name: '',
    email: '',
    message: '',
  }

  onSend = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;

    const form = new FormData();

    form.append('name', name);
    form.append('email', email);
    form.append('message', message);

    this.props.onSend(form);
  }

  render() {
    return (
      <div className={s.form}>
        <form
          acceptCharset="UTF-8"
          onSubmit={this.onSend}
          className={s.form__form}
        >
          <Input
            placeholder="Name"
            id="name"
            type="text"
            onChange={({ target }) => { this.name = target.value; }}
            className={s.form__input}
            required
          />

          <Input
            placeholder="Email"
            id="email"
            type="text"
            onChange={({ target }) => { this.email = target.value; }}
            className={s.form__input}
            required
          />

          <Input
            placeholder="Message"
            id="message"
            type="text"
            onChange={({ target }) => { this.message = target.value; }}
            className={s.form__textarea}
            multiline
            required
          />

          <div className={s.form__button}>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    );
  }
}
