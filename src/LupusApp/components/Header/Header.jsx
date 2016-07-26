import React, { Component } from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import cssm from '~/utils/CSSModules';
const style = require('./Header.scss');

@cssm(style)
export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar staticTop fluid styleName="initial">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Lupus</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
