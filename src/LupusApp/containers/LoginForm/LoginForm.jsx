import React, { Component } from 'react';

import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import MailIcon from 'react-icons/lib/fa/envelope';
import LockIcon from 'react-icons/lib/fa/lock';

import {connect} from 'react-redux';
import cssm from '~/utils/CSSModules';
import style from './Login.css';

@connect(state => {
  return {
    qwe: 123123
  }
})
@cssm(style)
export default class LoginForm extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Thumbnail styleName='centered'>
        <h3>Lupus</h3>
        <p>Авторизация</p>
        {/* <FormGroup>
          <InputGroup>
            <InputGroup.Addon><MailIcon /></InputGroup.Addon>
            <FormControl
              type='email'
              placeholder='Электронная почта'
              value={this.props.username}
              onChange={this.props.onChange('username')}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><LockIcon /></InputGroup.Addon>
            <FormControl
              type='password'
              placeholder='Пароль'
              value={this.props.password}
              onChange={this.props.onChange('password')}
            />
          </InputGroup>
        </FormGroup>
        <p>
          <Button
            onClick={this.props.onAuth}
            bsStyle='primary'
          >
            Авторизоваться
          </Button>
        </p> */}
      </Thumbnail>
    );
  }
}
