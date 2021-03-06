import React, { Component } from 'react';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';

import AddIcon from 'react-icons/lib/fa/plus';
import RefreshIcon from 'react-icons/lib/fa/refresh';

import {connect} from 'react-redux';

export class ProjectList extends Component {
  render() {
    return <Nav bsStyle='pills' styleName='inner' stacked>
      <Button onClick={this.props.refresh}><RefreshIcon /> Обновить список</Button>
      {this.props.projects.map((prj, index) => (
        <NavItem
          href='http://google.com'
          // onClick={this.props.setActive.bind(this, index)}
          active={index === this.props.active}
        >
        {prj.name}
        </NavItem>
      ))}
      <Button onClick={this.props.openModal}><AddIcon /> Добавить проект</Button>
    </Nav>
  }
}

export default ProjectList

// export default connect({
//
// })(ProjectList)
