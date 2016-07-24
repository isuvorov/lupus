import {zipObject} from 'lodash'
import React from 'react'
import Icon from 'react-fa'
import {Modal, Popover, Tooltip, Button, OverlayTrigger, Grid, Col, Row, FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap'
import Select from 'react-select'
import styles from "./EditorQ.css"

const AddImage = React.createClass({

  getInitialState() {
    return {showModal: false};
  },

  close() {
    this.setState({showModal: false});
  },

  open() {
    this.setState({showModal: true});
  },

  render() {
    let popover = <Popover title="popover">very popover. such engagement</Popover>
    let tooltip = <Tooltip>wow.</Tooltip>;

    return (
      <div>

        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          <Icon name="camera-retro"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Изображение к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form">
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="ссылка на  файл изображения"/>
            </form>

            <hr/>

            <h4>Настройки</h4>
            <div class="checkbox">
              <label>
                <input type="checkbox"/>
                Обзерать изображение
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox"/>
                Разрешить зумирование
              </label>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

const AddVideo = React.createClass({

  getInitialState() {
    return {showModal: false};
  },

  close() {
    this.setState({showModal: false});
  },

  open() {
    this.setState({showModal: true});
  },

  render() {
    let popover = <Popover title="popover">very popover. such engagement</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;

    return (
      <div>

        <Button bsStyle="default" bsSize="large" onClick={this.open}>
          <Icon name="film"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Видео к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form className="form-inline">
              <div className="form-group">
                <div class="input-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="ссылка на медиа файл"/>
                </div>
              </div>
            </form>

            <hr/>

            <h4>Настройки</h4>
            <div class="checkbox">
              <label>
                <input type="checkbox"/>
                Автовоспроизведение
              </label>
            </div>
            <div class="input-group">
              <label>Воспроизвести с
              </label>
              <input type="text" className="form-control" id="exampleInputEmail1" placeholder="00:00"/>
            </div>
            <div class="input-group">
              <label>Закончить воспроизведение</label>
              <input type="text" className="form-control" id="exampleInputEmail1" placeholder="01:00"/>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox"/>
                Скрыть элементы управления
              </label>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox"/>
                Скрыть элементы управления
              </label>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

const AddAudio = React.createClass({

  getInitialState() {
    return {showModal: false};
  },

  close() {
    this.setState({showModal: false});
  },

  open() {
    this.setState({showModal: true});
  },

  render() {
    let popover = <Popover title="popover">very popover. such engagement</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;

    return (
      <div>

        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          <Icon name="music"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Аудио к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form className="form">

              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="ссылка на медиа файл"/>

              <hr/>

              <h4>Настройки</h4>
              <div class="checkbox">
                <label>
                  <input type="checkbox"/>
                  Автовоспроизведение
                </label>
              </div>
              <div class="input-group">
                <label>Воспроизвести с
                </label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="00:00"/>
              </div>
              <div class="input-group">
                <label>Закончить воспроизведение</label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="01:00"/>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"/>
                  Скрыть элементы управления
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"/>
                  Скрывать исполнителя
                </label>
              </div>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.close} bsStyle="success">Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

const gridInstance = (
  <Grid>
    <Row className="show-grid">
      <Col xs={1} md={1}>
        <AddImage/>
      </Col>
      <Col xs={1} md={1}>
        <AddVideo/>
      </Col>
      <Col xs={1} md={1}>
        <AddAudio/>
      </Col>
    </Row>
  </Grid>
);

const gridInstance2 = (
  <Grid>
    <Row className="show-grid">
      <Col xs={1} md={1}>
        <AddImage/>
      </Col>

    </Row>
  </Grid>
);

var options = [
  {
    value: 'one',
    label: 'One'
  }, {
    value: 'two',
    label: 'Two'
  }
];

function logChange(val) {
  console.log("Selected: " + val);
}

export default class EditorQ extends React.Component {

  render() {
    return (
      <div className="container">

        <h1>Вопросы</h1>

        <label>
          Тип вопроса</label>
        <select>
          <option>
            1</option>
          <option>
            2</option>
          <option>
            3</option>
        </select>

        <label>
          Внешний вид вопроса</label>
        <select>
          <option>
            1</option>
          <option>
            2</option>
          <option>
            3</option>
        </select>

        <div className="well">

          <h3>
            Укажите вопрос
          </h3>
          <form>
            <div className="form-group">
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Укажите заголовок вопроса"/>
            </div>
            <fieldset className="form-group">
              <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Укажите текст вопроса"></textarea>
            </fieldset>
          </form>
        </div>
        {gridInstance}

        <h3>Настройки сложности вопроса</h3>
        <div className="checkbox">
          <label>
            Время на решение</label>
          <input type="input" value="1"/>

        </div>

        <div className="checkbox">
          <label>
            Указать Ценность вопроса</label>
          <input type="input" value="1"/>

        </div>

        <p>
          Указать категорию/категории вопроса</p>
        <textarea type="input" value="1"/>

        <p>
          Дополнительные метки вопроса</p>
        <textarea type="input" value="1"/>

        <hr/>

        <h1>Ответы</h1>

        <label>
          Тип ответа</label>
        <select>
          <option>
            button</option>
          <option>
            radio</option>
          <option>
            checkbox</option>
          <option>
            input</option>
        </select>

        <label>
          Внешний вид ответа</label>
        <select>
          <option>
            default</option>
          <option>
            grid</option>
        </select>

        <div className="well">

          <h3>
            Вариант ответа
          </h3>
          <form>
            <div className="form-group">
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Укажите заголовок ответа"/>
            </div>
            <fieldset className="form-group">
              <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Укажите текст вопроса"></textarea>

            </fieldset>
            <p>добавить изображение</p>
            {gridInstance2}
          </form>
        </div>

      </div>
    )
  }
}
