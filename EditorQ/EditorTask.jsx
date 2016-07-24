import {zipObject} from 'lodash'
import React from 'react'
import Icon from 'react-fa'
import {
  Modal,
  Button,
  OverlayTrigger,
  Grid,
  Col,
  Row,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'
import Select from 'react-select'
import styles from "./EditorQ.css"
// import ImageTask from "./components/image"

const ImageTask = React.createClass({

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

    var task = this.props.task;
    var btnClass = task.image
      ? "primary"
      : "default";

      // console.log("this.props.task",this.props.task);
      console.log("task.image",task.image);

      var imageSrc = "";
      var crop = false
      var controls = false;
      var portrait = false;
      var badge = false;

      if (task.image) {
        {
          typeof(task.image) == "string"
            ? imageSrc = task.image
            : imageSrc = task.image.src
        }

        if (task.image.crop) crop = task.image.crop;
        if (task.image.controls) controls = task.image.controls;
        if (task.image.portrait) portrait = task.image.portrait;
        if (task.image.badge) badge = task.image.badge;
      }

      console.log('image src', imageSrc);


    return (
      <div>

        <Button bsStyle={btnClass} bsSize="large" onClick={this.open}>
          <Icon name="camera-retro"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Изображение к вопрсосу:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form">
              <input onChange="" type="text" className="form-control"
                id="imageSrc" placeholder="ссылка на  файл изображения"
                value={imageSrc}/>
            </form>

            <hr/>

            <h4>Настройки</h4>
              <Row>
                <div className="col-md-6">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={!!crop}/>
                      Обрезать изображение
                    </label>
                  </div>

                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={!!controls}/>
                      Скрыть управление
                    </label>
                  </div>



                </div>

                <div className="col-md-6">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={!!portrait}/>
                      Портретная ориентация
                    </label>
                  </div>

                  <div className="checkbox">
                    <label>
                      <input type="checkbox" checked={!!badge}/>
                      Бейдж
                    </label>
                  </div>


                </div>


              </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

const AddText = React.createClass({

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

    var task = this.props.task;
    var btnClass = task.text
      ? "primary"
      : "default";

      // console.log(this.props.task);

    return (
      <div>

        <Button bsStyle={btnClass} bsSize="large" onClick={this.open}>
          <Icon name="font"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Текст к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form">
              <div className="form-group">
                <label >Добавить текст к вопросу:
                </label>
                <textarea className="form-control" rows="3">
                  {task.text}
                </textarea>
              </div>
            </form>

            <hr/>

            <h4>Настройки wysiwyg</h4>

            <div className="row">
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="bold"/>
                </Button>
              </div>
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="italic"/>
                </Button>
              </div>
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="list"/>
                </Button>
              </div>
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="font"/>
                </Button>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Закрыть</Button>
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

    var task = this.props.task;


    var btnClass = task.video ? "primary" : "default";
    var videoSrc = "";
    var autoplay = false
    var controls = false;
    var rel = false;
    var showinfo = false;
    var title = false;
    var byline = false;
    var portrait = false;
    var badge = false;
    var startedAt = "00:00";
    var endedAt = "";
    var soundOff = false;

    if (task.video) {
      {
        typeof(task.video) == "string"
          ? videoSrc = task.video
          : videoSrc = task.video.src
      }

      if (task.video.autoplay) autoplay = task.video.autoplay;
      if (task.video.controls) controls = task.video.controls;
      if (task.video.rel) rel = task.video.rel;
      if (task.video.showinfo) showinfo = task.video.showinfo;
      if (task.video.title) title = task.video.title;
      if (task.video.byline) byline = task.video.byline;
      if (task.video.portrait) portrait = task.video.portrait;
      if (task.video.badge) badge = task.video.badge;
      if (task.video.soundOff) soundOff = task.video.soundOff;

      if (task.video.startedAt) startedAt = task.video.startedAt;
      if (task.video.endedAt) endedAt = task.video.endedAt;

    }

    console.log('video src', videoSrc);

    return (
      <div>

        <Button bsStyle={btnClass} bsSize="large" onClick={this.open}>
          <Icon name="film"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Видео к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form className="form">

              <div className="form-group">
                <label >
                  Добавить ссылку
                </label>
                <input type="text" className="form-control"
                  id="video" placeholder="ссылка на видео" value={videoSrc}/>
              </div>

            </form>

            <hr/>

            <h4>Настройки</h4>

            <Row>
              <div className="form-group col-sm-6">
                <label className=" control-label">Начать воспроизвделение</label>
                <div >
                  <input type="text" className="form-control"
                    id="startedAt"
                    placeholder="00:00" value={startedAt}/>
                </div>
              </div>
              <div className="form-group col-sm-6">
                <label className=" control-label">Закончить воспроизвделение</label>
                <div >
                  <input type="text" className="form-control" id="endedAt" placeholder="00:10" value={endedAt}/>
                </div>
              </div>

            </Row>

            <Row>
              <div className="col-md-4">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!autoplay}/>
                    Автовоспроизведение
                  </label>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!controls}/>
                    Скрыть управление
                  </label>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!rel}/>
                    Показать похожие
                  </label>
                </div>

              </div>

              <div className="col-md-4">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!title}/>
                    Скрыть название
                  </label>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!showinfo}/>
                    Скрыть описание
                  </label>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!byline}/>
                    byline
                  </label>
                </div>
              </div>

              <div className="col-md-4">

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!portrait}/>
                    Вертикальное видео
                  </label>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!badge}/>
                    Метка
                  </label>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!soundOff}/>
                    Выкл. звук
                  </label>
                </div>
              </div>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Закрыть</Button>
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
    var task = this.props.task;
    var btnClass = task.audio
      ? "primary"
      : "default";


      var audioSrc = "";
      var autoplay = false;
      var controls = false;
      var related = false;
      var title = false;
      var show_comments = false;
      var show_user = false;
      var show_reposts = false;
      var show_artwork = false;
      var badge = false;
      var startedAt = "00:00";
      var endedAt = "";

      if (task.audio) {
        {
          typeof(task.audio) == "string"
            ? audioSrc = task.audio
            : audioSrc = task.audio.src
        }

        console.log(audioSrc);

        if (task.audio.autoplay) autoplay = task.audio.autoplay;
        if (task.audio.controls) controls = task.audio.controls;
        if (task.audio.related) related = task.audio.related;
        if (task.audio.show_comments) show_comments = task.audio.show_comments;
        if (task.audio.title) title = task.audio.title;
        if (task.audio.show_user) show_user = task.audio.show_user;
        if (task.audio.show_reposts) show_reposts = task.audio.show_reposts;
        if (task.audio.badge) badge = task.audio.badge;
        if (task.audio.show_artwork) show_artwork = task.audio.show_artwork;

        if (task.audio.startedAt) startedAt = task.audio.startedAt;
        if (task.audio.endedAt) endedAt = task.audio.endedAt;

      }


    return (
      <div>

        <Button bsStyle={btnClass} bsSize="large" onClick={this.open}>
          <Icon name="music"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Аудио к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form className="form">

              <input onChange="" type="text"
                className="form-control"
                id="audio"
                placeholder="ссылка на звуковой файл"
                value={audioSrc}/>

              <hr/>

              <h4>Настройки</h4>
                <Row>
                  <div className="form-group col-sm-6">
                    <label className=" control-label">Начать воспроизвделение</label>
                    <div >
                      <input type="text" className="form-control"
                        id="startedAt"
                        placeholder="00:00" value={startedAt}/>
                    </div>
                  </div>
                  <div className="form-group col-sm-6">
                    <label className=" control-label">Закончить воспроизвделение</label>
                    <div >
                      <input type="text" className="form-control" id="endedAt" placeholder="00:10" value={endedAt}/>
                    </div>
                  </div>

                </Row>

                <Row>
                  <div className="col-md-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!autoplay}/>
                        Автовоспроизведение
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!controls}/>
                        Скрыть управление
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!related}/>
                        Показать похожие
                      </label>
                    </div>

                  </div>

                  <div className="col-md-4">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!title}/>
                        Скрыть название
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!show_comments}/>
                        Скрыть комментарии
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!show_user}/>
                        Скрыть автора
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4">

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!show_reposts}/>
                        Показать репосты
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!badge}/>
                        Ометки
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={!!show_artwork}/>
                        Убрать оформление
                      </label>
                    </div>
                  </div>
                </Row>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

const ToggleButton = React.createClass({

  getInitialState: function() {
    return {collapsed: false};
  },
  handleClick: function(event) {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },
  render: function() {
    var spoiler;

    if (!this.state.collapsed) {
      spoiler = (
        <div></div>
      );
    } else {
      spoiler = (
        <div>

          <div className="row">
            <div className="form-group col-sm-6">
              <label className=" control-label">Время на решение</label>
              <div >
                <input onChange="" className="form-control" type="text" id="formGroupInputSmall" placeholder="Small input"/>
              </div>
            </div>
            <div className="form-group col-sm-6">
              <label className=" control-label">Ценность вопроса</label>
              <div >
                <input onChange="" className="form-control" type="text" id="formGroupInputSmall" placeholder="Small input"/>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label >Указать категорию/категории вопроса:</label>
            <textarea className="form-control" rows="3" id="comment"></textarea>
          </div>

          <div className="form-group">
            <label >Указать метки вопроса:</label>
            <textarea className="form-control" rows="3" id="comment"></textarea>
          </div>

        </div>

      );
    }

    return (
      <div>

        <Button onClick={this.handleClick}>
          Дополнительные настройки
        </Button>

        {spoiler}
      </div>
    )
  }
});

// я не знаю, что это такое и не помню, как это сюда попало
function logChange(val) {
  // console.log("Selected: " + val);
}

export default class EditorTask extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showSettings: false
    }
  }

  render() {
    const toggle = (e) => {
      this.setState({
        showSettings: !this.state.showSettings
      })
    }

    var task = this.props.task;

    return (
      <div>
        <h2>
          Новый вопрос
        </h2>

        <div className="row">
          <div className="form-group col-sm-6">
            <label className=" control-label">Тип вопроса:</label>
            <div >
              <select className="form-control" id="sel1">

                <option defaultValue={task.type
                  ? task.type
                  : "default"}>{task.type
                    ? task.type
                    : "default"}</option>
                <option value="game">game</option>

              </select>
            </div>
          </div>

          <div className="form-group col-sm-6">
            <label className=" control-label">Вид вопроса</label>
            <div >
              <select className="form-control" id="taskView">
                <option defaultValue={task.view
                  ? task.view
                  : "default"}>{task.view
                    ? task.view
                    : "default"}</option>
                <option value="puzzle">puzzle</option>
              </select>
            </div>
          </div>
        </div>

        <div className="well">
          <h3>
            Вопрос
          </h3>
          <form>

            <div className="form-group">
              <input onChange="" type="text" className="form-control" id="taskTitle" placeholder="Укажите заголовок вопроса" value={task.question.title}/>
            </div>

          </form>
          <Row className="show-grid">
            <Col xs={1} md={1}>
              <AddText task={task.question}/>
            </Col>
            <Col xs={1} md={1}>
              <ImageTask task={task.question}/>
            </Col>
            <Col xs={1} md={1}>
              <AddVideo task={task.question}/>
            </Col>
            <Col xs={1} md={1}>
              <AddAudio task={task.question}/>
            </Col>
            <Col xs={8} md={8}>
              <Button className="pull-right" bsStyle="default" bsSize="large" onClick={toggle}>
                Дополнительные параметры
              </Button>
            </Col>
          </Row>

          {this.state.showSettings && (
            <div>

              <div className="row">
                <div className="form-group col-sm-6">
                  <label className=" control-label">Время на решение</label>
                  <div >
                    <input onChange="" className="form-control" type="text" id="formGroupInputSmall" placeholder="Small input"/>
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <label className=" control-label">Ценность вопроса</label>
                  <div >
                    <input onChange="" className="form-control" type="text" id="formGroupInputSmall" placeholder="Small input"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label >Указать категорию/категории вопроса:</label>
                <textarea className="form-control" rows="3" id="comment"></textarea>
              </div>

              <div className="form-group">
                <label >Указать метки вопроса:</label>
                <textarea className="form-control" rows="3" id="comment"></textarea>
              </div>

            </div>
          )}

        </div>

      </div>
    )
  }
}
