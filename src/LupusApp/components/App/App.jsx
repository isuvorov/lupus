import { Component, PropTypes } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import CloseIcon from 'react-icons/lib/fa/close';
import SaveIcon from 'react-icons/lib/fa/check';
import AddIcon from 'react-icons/lib/fa/plus';

import Header from '../Header';
import cssModules from '~/utils/CSSModules';

@cssModules(require('./App.scss'))
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
  render() {
    const panelHeader = (
      <h2>{this.state.project.name}
        <div style={{ marginLeft: 'auto' }}>
          <Button bsSize="small" bsStyle="danger" style={{ borderRadius: '3px 0 0 3px' }}>
            <CloseIcon />
          </Button>
          <Button bsSize="small" bsStyle="success" style={{ borderRadius: '0 3px 3px 0' }}>
            <SaveIcon />
          </Button>
        </div>
      </h2>
    );
    const { project } = this.state;
    return (
      <div styleName="root">
        <Header />
        <Grid fluid styleName="content">
          <Row>
            <Col styleName="fullish" className="sidebar" md={2} sm={3}>
              <Nav bsStyle="pills" styleName="inner" stacked>
                {this.renderProjectItems()}
                <Button block><AddIcon /> Добавить проект</Button>
              </Nav>
            </Col>
            <Col md={10} mdOffset={2} sm={9} smOffest={3}>
              <div styleName="inner">
                <EditorBemjson bemjson={json} onSave={() => {}} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
