import React, { Component } from 'react'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import LoginForm from '../../containers/LoginForm'
import cssm from 'lego-starter-kit/utils/CSSModules'
const style = require('./LoginPage.css')

@cssm(style)
export default class LoginPage extends Component {
  // static defaultProps = {
  //   server: 'http://localhost:3000/api/',
  // }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: '',
  //     password: '',
  //   };
  //   this.api = new Api({ base: this.props.server });
  // }
  // handleChange = (type) => (e) => {
  //   this.setState({ [type]: e.target.value })
  // }
  // handleAuth = () => {
  //   const { username, password } = this.state;
  //   if (username > 3 && password > 3) {
  //     this.api.authLogin({ username, password }).then((user) => {
  //       alert('Вы авторизовались');
  //     });
  //   }
  // }
  render() {
    return (
      <Row>
        <Col xs={6} md={4} styleName='centered'>
          <LoginForm />
        </Col>
      </Row>
    );
  }
}
