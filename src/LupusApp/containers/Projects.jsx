import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import pick from 'lodash/pick';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import CreateProject from '../components/Modals/CreateProject';
import EditorBemjson from '../../Editor/EditorBemjson';
import schema from '../components/schema';
import Projects from '../components/Projects';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import Api from '../ApiClient';

export default class App extends Component {
  static defaultProps = {
    server: 'http://localhost:8080/api/',
  }
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      newProject: '',
      showModal: false,
      projects: [],
      project: {},
    };
    this.api = new Api({ base: this.props.server })
  }
  componentDidMount() {
    this.refreshProjects();
  }
  setActive = (index) => {
    const active = index;
    let project = this.state.projects[active] || {};
    this.api.getProject(project._id).then((data) => {
      project = data;
      this.setState({ active, project });
    });
  }
  refreshProjects = () => {
    this.api.getProjects().then((data) => {
      const projects = data.map((item) => pick(item, ['_id', 'name']));
      this.setState({ projects });
    });
  }
  newProject = () => {
    const { newProject, projects } = this.state;
    this.api.createProject(newProject).then((project) => {
      projects.push(project);
      this.setState({ projects, project });
      this.closeModal();
    });
  }
  closeModal = () => {
    this.setState({ showModal: false });
  }
  openModal = () => {
    this.setState({ showModal: true });
  }
  handleChangeNewProject = (e) => {
    this.setState({ newProject: e.target.value })
  }

  @autobind
  handleChangeProject(project) {
    this.setState({
      project,
    })
  }

  @autobind
  handleSave() {
    const { project } = this.state;
    this.api.setProject(project._id, project).then((project) => {
      console.log(project);
      alert('saved')
    })
    .catch((err) => {
      console.log(err);
      alert('error')
    })
  }
  testMethod = () => {
    alert(this.state.project._id);
  }
  render() {
    const project = this.state.project
    const tasks = this.state.project.tasks || []
    const getWebhook = (url) => {
      return `http://panel.s3.mgbeta.ru/api/projects/byName/${project.name}/${url}`
      return `http://panel.s3.mgbeta.ru/projects/byName/${project.name}/syncFs/runTask`
      return 'http://lupus.s3.mgbeta.ru/'
    }
    const buttons = [
      {
        type: 'dropdown',
        name: 'Ссылки',
        links: [
          {
            src: 'http://jsonlint.com/',
            name: 'JSON Валидатор',
          },
          {
            src: 'https://google.ru/',
            name: 'Google RU',
          },
          {
            action: this.testMethod,
            name: 'Позвать Василия',
          },
        ],
      },
      {
        type: 'single',
        name: 'Yandex',
        src: 'http://yandex.ru',
      },
      {
        type: 'single',
        name: 'Пикачу',
        action: this.testMethod,
      },
    ]
    // console.log(this.state);
    return (
      <main styleName='root'>
        {/* <Header /> */}
        <Grid>
          <Row>
            <Col md={2} sm={3}>
              <Projects
                refresh={this.refreshProjects}
                projects={this.state.projects}
                setActive={this.setActive}
                active={this.state.active}
                openModal={this.openModal}
              />
            </Col>
            <Col md={10} sm={9}>
              {Object.keys(project).length > 0 && <div>
                <Menu
                  title={project.name}
                  buttons={buttons}
                  onSave={this.handleSave}
                />
                <Tasks
                  getWebhook={getWebhook}
                  tasks={tasks}
                />
                <div styleName='inner'>
                  <EditorBemjson
                    value={project}
                    schema={schema}
                    onChange={this.handleChangeProject}
                    onSubmit={this.handleSubmit}
                  />
                </div>
              </div>}
            </Col>
          </Row>
          <CreateProject
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            value={this.state.newProject}
            onChange={this.handleChangeNewProject}
            onSubmit={this.newProject}
          />
        </Grid>
      </main>
    );
  }
}
