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
  HelpBloc
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


const Correct = React.createClass({

  render () {

    var checker = this.props.checker;
    var option = this.props.option;

    console.log("checkchekc", checker, "opopop", option);
    // console.log("opopop", option);
      return (
        <label>
          <input onChange="" type="checkbox" checked={checker == option}/>
          Отметить как правильный
        </label>

      )
  }
});


export default class EditorDecision extends React.Component {

  render() {

    var task = this.props.task;

    var option;

    if (task.decision.options) {

      option = task.decision.options.map(function(option, i) {
        return (
          <div className="well" key={i}>

            <div className="col-sm-6">
              <h3>
                Вариант ответа {i + 1}
              </h3>
            </div>

            <div className="col-sm-6">
              <div className="pull-right">
                <Button bsStyle="danger">
                  <Icon name="trash"/>
                </Button>
              </div>

            </div>

            <form>

              <div className="form-group">
                <input onChange="" type="text" className="form-control" id="optionTitle" placeholder="Укажите заголовок ответа" value={option.title}/>
              </div>

              <Row className="show-grid">
                <Col xs={1} md={1}>
                  <AddText task={option}/>
                </Col>
                <Col xs={1} md={1}>
                  <ImageTask task={option}/>
                </Col>
                <Col xs={4} md={4}></Col>
                <Col sm={6}>
                  <div className="checkbox pull-right">

                    <Correct checker={task.checker.value} option={option.value}/>

                  </div>

                </Col>

              </Row>

            </form>

          </div>
        )

      })
    }

    if (task.decision.type == "input") {

      option = (<div className="well">

        <h3>
          Вариант ответа
        </h3>
        <form>
          <div className="row">
            <div className="form-group col-sm-4">
              <label className=" control-label" >Параметры ввода</label>
              <div className="">
                <select className="form-control" id="sel1">
                  <option value="">Однострочный</option>
                  <option value="">Многострочный</option>
                  <option value="">Посимвольный</option>
                  <option value="">DatePicker</option>

                </select>
              </div>
            </div>

            <div className="form-group col-sm-4">
              <label className=" control-label" >Вид данных</label>
              <div className="">
                <select className="form-control" id="sel1">
                  <option value="">Строка</option>
                  <option value="">Цифра</option>
                  <option value="">Дата</option>
                </select>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group ">
                <div className="checkbox">
                  <label>
                    <input onChange="" type="checkbox"/>
                    учитывать регистр
                  </label>
                </div>
              </div>
            </div>

          </div>

          <Row>
            <Col sm={10} md={10}>
              <div className="form-group">
                <input onChange="" type="text" className="form-control" id="exampleInputEmail1" placeholder="Укажите верный вариант ответа" value="asdasd"/>
              </div>
            </Col>
            <div className="col-sm-1">
              <Button bsStyle="success">
                <Icon name="plus"/>
              </Button>
            </div>
            <div className="col-sm-1">
              <Button bsStyle="danger">
                <Icon name="trash"/>
              </Button>
            </div>
          </Row>

          <div className="row">
            <div className="col-sm-10">
              <div className="form-group">
                <input onChange="" type="text" className="form-control " id="exampleInputEmail1" placeholder="Укажите верный вариант ответа"/>
              </div>
            </div>
            <div className="col-sm-1">
              <Button bsStyle="success">
                <Icon name="plus"/>
              </Button>
            </div>
            <div className="col-sm-1">
              <Button bsStyle="danger">
                <Icon name="trash"/>
              </Button>
            </div>
          </div>
        </form>
      </div>)


    }

    return (
      <div>
        <h2>Решение</h2>

        <div className="row">

          <div className="form-group col-sm-4">
            <label className=" control-label" >Тип решения</label>
            <div className="">
              <select className="form-control" id="sel1">
                <option value="">Buttons</option>
                <option value="">Radio</option>
                <option value="">CheckBox</option>
                <option value="">Input</option>
              </select>
            </div>
          </div>

          <div className="form-group col-sm-4">
            <label className=" control-label" >Вид решения</label>
            <div className="">
              <select className="form-control" id="sel1">
                <option value="">default</option>
                <option value="">grid</option>
                <option value="">2columns</option>
              </select>
            </div>
          </div>

          <div className="form-group col-sm-4">
            <label className=" control-label" >Тип проверки</label>
            <div className="">
              <select className="form-control" id="sel1">
                <option value="">match</option>
                <option value="">OneOf</option>
                <option value="">set</option>
              </select>
            </div>
          </div>

        </div>

        {option}

        <Row>
          <Col xs={4} md={4} lg={4}>
            <Button bsStyle="success">
              <Icon name="plus"/>
              Добавить вариант
            </Button>
          </Col>
        </Row>

        <hr/>
      </div>
    )
  }
}
