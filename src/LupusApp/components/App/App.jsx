import React, { Component, PropTypes } from 'react';
import EditorBemjson from '../../../Editor/EditorBemjson';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import NavItem from 'react-bootstrap/lib/NavItem';

import cssm from '~/utils/CSSModules';
const style = require('./App.scss');

@cssm(style)
export default class App extends Component {
  static propTypes = {
    projects: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      project: this.props.projects[0],
    };
    this.setActive = this.setActive.bind(this)
  }
  setActive() {
    const active = 1
    const project = this.props.projects[active] || {};
    this.setState({ active, project });
  }
  renderProjectItems() {
    return this.props.projects.map((prj, index) => (
      <NavItem
        onClick={this.setActive}
        active={index === this.state.active}
      >
        {prj.name}
      </NavItem>
    ))
  }
  saveTab(data) {
    const { project } = this.state;
    project.files = data;
    this.setState({ project })
  }
  render() {
    const { project } = this.state;
    return (
      <Row>
        <Col styleName="fullish" md={12}>
          <Tabs defaultActiveKey={1} animation={false} id="project-tabs">
            <Tab eventKey={1} title="Информация">
              <div styleName="inner">
                <EditorBemjson bemjson={project} onSave={() => {}} />
              </div>
            </Tab>
            <Tab eventKey={2} title="Общие данные">
              <div styleName="inner">
                <EditorBemjson bemjson={project.general} onSave={() => {}} />
              </div>
            </Tab>
            <Tab eventKey={3} title="Репозитории">
              <div styleName="inner">
                <EditorBemjson bemjson={project.repos} onSave={() => {}} />
              </div>
            </Tab>
            <Tab eventKey={4} title="Файлы">
              <div styleName="inner">
                <EditorBemjson bemjson={project.files} onChange={this.saveTab} />
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}
