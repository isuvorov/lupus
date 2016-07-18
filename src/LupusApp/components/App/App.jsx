import React, { Component } from 'react';
import { debounce } from 'lodash';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tab from 'react-bootstrap/lib/Tab';
import Well from 'react-bootstrap/lib/Well';
import Tabs from 'react-bootstrap/lib/Tabs';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import CloseIcon from 'react-icons/lib/fa/close';
import SaveIcon from 'react-icons/lib/fa/check';
import AddIcon from 'react-icons/lib/fa/plus';

import Header from '../Header';
import cssModules from '~/utils/CSSModules';

@cssModules(require('./App.styl'))
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      project: this.props.projects[0],
    };
    this.handleChangeValue = this.handleChangeValue.bind(this)

  }
  setActive = (active) => {
    const project = this.props.projects[active] || {};
    this.setState({ active, project });
  }
  // handleChangeValue = (object, key) => debounce((e) => {
  //   console.log('handleChangeValue');
  //   const project = this.state.project;
  //   project[object][key] = e.target.value;
  //   this.setState({ project });
  // }, 250);



  handleChangeValue(e) {
    e.target['kek'] = 'general';
    console.log(e.target.kek);
    // const project = this.state.project;
    // // e.target.data
    // project[object][key] = e.target.value;
    // this.setState({ project });
  }
  // debounce((e) => {
  //   console.log('handleChangeValue');
  //   const project = this.state.project;
  //   project[object][key] = e.target.value;
  //   this.setState({ project });
  // }, 250);


  handleChangeKey = (object, key) => (e) => {
    console.log(e.target);
    console.log('handleChangeKey');
    const project = this.state.project;
    project[object][e.target.value] = project[object][key];
    delete project[object][key];
    this.setState({ project });
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
    const projectButton = {
      borderRadius: '0 0 3px 3px',
      borderColor: '#ddd',
      padding: '10px 0',
    };
    const { project, active } = this.state;
    return (
      <div styleName="root">
        <Header />
        <Button onClick={debounce(() => {
          console.log('CLICK');
        }, 600)}>CLICK</Button>
        <Grid>
          <Row>
            <Col md={4}>
              <ListGroup>
                <For each="prj" index="index" of={ this.props.projects}>
                  <ListGroupItem
                    onClick={this.setActive.bind(this, index)}
                    active={index === active}>
                    {prj.name}
                  </ListGroupItem>
                </For>
                <Button style={projectButton} block><AddIcon /> Добавить проект</Button>
              </ListGroup>
            </Col>
            <Col md={8}>
              <Panel header={panelHeader}>
                <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
                  <Tab eventKey={0} title="Информация">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Название</th>
                          <th>Описание</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Git hook</td>
                          <td><a href={`http://panel.s3.mgbeta.ru/projects/refresh?name=${project.name}`}>
                          {`http://panel.s3.mgbeta.ru/projects/refresh?name=${project.name}`}
                          </a></td>
                        </tr>
                      </tbody>
                    </Table>
                    <Button block><AddIcon /> Добавить информацию</Button>
                  </Tab>
                  <Tab eventKey={1} title="Общие данные">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Название</th>
                          <th>Значение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(project.general).map((key, i) => (
                          <tr key={`gen-${i}`}>
                            <td style={{ width: '30%' }}>
                              <FormControl
                                type="text"
                                object="general"
                                key={key}
                                placeholder="Введите название"
                                onChange={this.handleChangeKey}
                                value={key}
                              />
                            </td>
                            <td style={{ width: '70%' }}>
                              <FormControl
                                type="text"
                                object="general"
                                key={key}
                                ref={{ object: 'general', key }}
                                placeholder="Введите значение"
                                onChange={this.handleChangeValue}
                                value={project.general[key]}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button block><AddIcon /> Добавить данные</Button>
                  </Tab>
                  <Tab eventKey={2} title="Репозитории">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Название</th>
                          <th>Ссылка</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(project.repos).map((key, i) => (
                          <tr key={`repo-${i}`}>
                            <td style={{ width: '30%' }}>
                              <FormControl
                                type="text"
                                object="repos"
                                key={key}
                                placeholder="Введите название"
                                onChange={this.handleChangeKey}
                                value={key}
                              />
                            </td>
                            <td style={{ width: '70%' }}>
                              <FormControl
                                type="text"
                                object="repos"
                                key={key}
                                placeholder="Введите ссылку"
                                onChange={this.handleChangeValue}
                                value={project.repos[key]}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button block><AddIcon /> Добавить репозиторий</Button>
                  </Tab>
                  <Tab eventKey={3} title="Файлы">
                    {Object.keys(project.files).map((key, i) => (
                      <Well styleName="card" bsSize="small" key={`file-${i}`}>
                        <FormGroup controlId="controlNameFile">
                          <ControlLabel>Файл</ControlLabel>
                          <FormControl
                            type="text"
                            object="files"
                            key={key}
                            placeholder="Введите название файла"
                            onChange={this.handleChangeKey}
                            value={key}
                          />
                        </FormGroup>
                        <FormGroup controlId="controlNameFile">
                          <ControlLabel>Содержимое</ControlLabel>
                          <pre>
                            <FormControl
                              componentClass="textarea"
                              placeholder="Наполните файл содержимым"
                              rows={8}
                              object="files"
                              key={key}
                              onChange={this.handleChangeValue}
                              value={project.files[key]}
                            />
                          </pre>
                        </FormGroup>
                        <Button bsStyle="danger" block><CloseIcon /> Удалить</Button>
                      </Well>
                    ))}
                    <Button block><AddIcon /> Добавить файл</Button>
                  </Tab>
                </Tabs>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
