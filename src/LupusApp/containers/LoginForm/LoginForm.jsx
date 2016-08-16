import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import MailIcon from 'react-icons/lib/fa/envelope';
import LockIcon from 'react-icons/lib/fa/lock';

import * as authActions from '../../redux/modules/auth';
import cssm from '~/utils/CSSModules';
import style from './LoginForm.css';

@connect(
  state => {
    console.log(state);
    return { user: state.auth.user }
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
    let { username, password } = this.refs;
    this.props.login(username, password);
    username = '';
    password = '';
  }
  render() {
    if (!this.props.user) {
      return (
        <Thumbnail styleName='centered'>
          <h3>Lupus</h3>
          <p>Авторизация</p>
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
                Авторизоваться
              </Button>
            </p>
          </form>
        </Thumbnail>
      );
    } else {
      return (
        <div>123</div>
      );
    }
  }
}
