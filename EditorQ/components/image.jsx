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
import styles from "../EditorQ.css"

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

export default ImageTask
