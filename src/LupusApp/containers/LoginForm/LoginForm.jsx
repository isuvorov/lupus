import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import MailIcon from 'react-icons/lib/fa/envelope';
import LockIcon from 'react-icons/lib/fa/lock';

import * as authActions from '../../redux/modules/auth';
import cssm from 'lego-starter-kit/utils/CSSModules';
import style from './LoginForm.css';

@connect(
  state => {
    return { user: state.user}
  },
  authActions
)
@cssm(style)
export default class LoginForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value
    const password = ReactDOM.findDOMNode(this.refs.password).value
    this.props.login(username, password);
    ReactDOM.findDOMNode(this.refs.username).value = '';
    ReactDOM.findDOMNode(this.refs.password).value = '';
  }
  render() {
    if (!this.props.user) {
      return (
        <Thumbnail styleName='centered'>
          <h3>Авторизация</h3>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon><MailIcon /></InputGroup.Addon>
                <FormControl
                  type='email'
                  ref='username'
                  placeholder='Электронная почта'
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon><LockIcon /></InputGroup.Addon>
                <FormControl
                  type='password'
                  ref='password'
                  placeholder='Пароль'
                />
              </InputGroup>
            </FormGroup>
            <p>
              <Button
                onClick={this.handleSubmit}
                bsStyle='primary'
              >
                Войти
              </Button>
            </p>
          </form>
        </Thumbnail>
      );
    } else {
      return (
        <div>123
          {this.props.user}
        </div>
      );
    }
  }
}
