import { Component, PropTypes } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import CloseIcon from 'react-icons/lib/fa/close';
import SaveIcon from 'react-icons/lib/fa/check';
import AddIcon from 'react-icons/lib/fa/plus';

import { autobind } from 'core-decorators'


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
      newProject: '',
      showModal: false,
      projects: [],
      project: {},
    };
  }
  componentDidMount() {
    this.getProjects();
  }
  setActive = (index) => {
    const active = index;
    const project = this.state.projects[active] || {};
    this.setState({ active, project });
  }
  getProjects = () => {
    let { project } = this.state;
    fetch('http://localhost:3000/api/projects/', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((obj) => obj.data)
    .then((projects) => {
      project = projects[0];
      this.setState({ projects, project });
    });
  }
  getValidationState = () => {
    const length = this.state.newProject.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }
  newProject = () => {
    const { newProject, projects } = this.state;
    // if (newProject.length > 5) {
    fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newProject }),
    })
    .then((res) => res.json())
    .then((obj) => obj.data)
    .then((project) => {
      projects.push(project);
      this.setState({ projects, project });
      this.closeModal();
    });
    // }
  }
  closeModal = () => {
    this.setState({ showModal: false });
  }
  openModal = () => {
    this.setState({ showModal: true });
  }
  handleChange = (e) => {
    this.setState({ newProject: e.target.value });
  }

  @autobind
  handleSubmit(json) {
    fetch(`http://localhost:3000/api/projects/${this.state.project._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
    .then((res) => res.json())
    .then((obj) => obj.data)
    .then((project) => {
      console.log(project);
      alert('saved')
    });
    // }
    // this.setState({ newProject: e.target.value });
  }

  renderProjectItems = () => {
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
        {/*<Header />*/}
        <Grid fluid styleName="content">
          <Row>
            <Col styleName="fullish" className="sidebar" md={2} sm={3}>
              <Nav bsStyle="pills" styleName="inner" stacked>
                {this.renderProjectItems()}
                <Button onClick={this.openModal}><AddIcon /> Добавить проект</Button>
              </Nav>
            </Col>
            {/*<Col md={10} mdOffset={2} sm={9} smOffest={3}>*/}
            <Col md={10} sm={9}>
              <div styleName="inner">
                <EditorBemjson value={this.state.project} onSubmit={this.handleSubmit} />
              </div>
            </Col>
          </Row>
        </Grid>
        <Modal bsSize="small" show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Создать проект</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Название проекта</ControlLabel>
              <FormControl
                type="text"
                value={this.state.newProject}
                placeholder="Придумайте название"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Не меньше 6 символов</HelpBlock>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.newProject}>Создать</Button>
            <Button onClick={this.closeModal}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
