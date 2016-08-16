import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default function Header() {
  return (
    <Navbar staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Lupus</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/projects">Проекты</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/login">Войти</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
