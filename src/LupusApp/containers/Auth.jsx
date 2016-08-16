import React, { Component } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import LoginForm from '../components/Login';
// import Api from '../routes/methods';

export default class Auth extends Component {
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
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            <LoginForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}
