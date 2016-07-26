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

import EditorBemjson from '../../../Editor/EditorBemjson';
import Header from '../Header';
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
      projects: [],
      project: {},
    };
  }
  componentDidMount() {
    this.getProjects();
  }
  getProjects = () => {
    let { project } = this.state;
    fetch('http://y.mgbeta.ru:666/projects', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((obj) => obj.data)
    .then((projects) => {
      project = projects[0];
      this.setState({ projects, project });
    });
  }
  setActive = (index) => {
    const active = index;
    const project = this.state.projects[active] || {};
    this.setState({ active, project });
  }
  renderProjectItems() {
    return this.state.projects.map((prj, index) => (
      <NavItem
        onClick={this.setActive.bind(this, index)}
        active={index === this.state.active}
      >
        {prj.name}
      </NavItem>
    ))
  }
  render() {
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
                <EditorBemjson bemjson={this.state.project} onSave={() => {}} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
