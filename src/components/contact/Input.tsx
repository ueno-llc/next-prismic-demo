import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Input.scss';

export class Input extends Component {

  static propTypes = {
    id: PropTypes.string,
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['email', 'text', 'tel']),
    onChange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  }

  state = {
    hasValue: false,
  }

  handleInputKeyUp = () => {
    this.setState({
      hasValue: !!this.input.value,
    });
  }

  render() {
    const { id, multiline, placeholder, type, onChange, className, ...rest } = this.props;

    const { hasValue } = this.state;
    const InputElement = multiline ? 'textarea' : 'input';

    return (
      <div className={s(s.input, className, { 'input--multiline': multiline })}>
        <label // eslint-disable-line
          className={s(s.input__label, { visible: hasValue })}
          htmlFor={id}
        >
          {placeholder}
        </label>

        <InputElement
          className={s.input__field}
          ref={(c) => { this.input = c; }}
          type={type}
          name={id}
          placeholder={placeholder}
          onKeyUp={this.handleInputKeyUp}
          onChange={onChange}
          {...rest}
        />
      </div>
    );
  }
}
