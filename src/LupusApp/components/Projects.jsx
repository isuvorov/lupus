import React, { Component } from 'react';

import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';


import { autobind } from 'core-decorators';

import ProjectList from './ProjectList';

export default class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
    }
  }
  @autobind
  handleSelect(activeKey) {
    this.setState({ activeKey });
  }
  render() {
    const { activeKey } = this.state
    return <PanelGroup activeKey={activeKey} onSelect={this.handleSelect} accordion>
      <Panel header="Список проектов" eventKey="1">
        <ProjectList {...this.props} />
      </Panel>
      <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
    </PanelGroup>
  }
}
