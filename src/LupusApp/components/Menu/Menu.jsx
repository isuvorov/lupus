import React, { Component } from 'react';
import shortid from 'shortid';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/lib/Navbar'
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';

import cssm from 'lego-starter-kit/utils/CSSModules';
const style = require('./Menu.css');

@cssm(style)
export default class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let style = {};
    // if (this.props.fixed) {
    //   style = {
    //     position: 'fixed',
    //   }
    // }
    return (
      <Navbar
        fluid
        styleName={classnames({ submenu: true, fixed: this.props.fixed })}
      >
        <Navbar.Header>
          <Navbar.Brand>
            {this.props.title}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.buttons && <Nav>
            {this.props.buttons.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <NavDropdown
                    key={`${item.type}-${shortid.generate()}`}
                    id={`${item.type}-${shortid.generate()}`}
                    title={item.name}
                  >
                    {item.links.map((link) => {
                      let dropdownAction = {}
                      if (link.src) dropdownAction = { href: link.src, target: '__blank' }
                      else dropdownAction = { onClick: link.action }
                      return (
                        <MenuItem {...dropdownAction} key={shortid.generate()}>
                          {link.name}
                        </MenuItem>
                      );
                    }
                  )}
                  </NavDropdown>
                );
              } else if (item.type === 'single') {
                let singleAction = {}
                if (item.src) singleAction = { href: item.src, target: '__blank' }
                else singleAction = { onClick: item.action }
                return <NavItem {...singleAction} key={shortid.generate()}>{item.name}</NavItem>
              }
            })}
          </Nav>}
          {this.props.onSave && <Navbar.Form pullRight>
            <Button bsStyle='success' onClick={this.props.onSave}>
              Сохранить
            </Button>
          </Navbar.Form>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
