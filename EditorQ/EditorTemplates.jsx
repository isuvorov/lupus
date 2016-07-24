import {zipObject} from 'lodash'
import React from 'react'
import Icon from 'react-fa'
import {
  Modal,
  Popover,
  Tooltip,
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

export default class EditorTemplates extends React.Component {

  render() {

    return (
      <div className="container">
        <h1>Выберите шаблон:</h1>

        <Row>

          <TemplateItem
              title="Вопрос и 4 варианта ответа"
              description= "Предустановлено "
              link="#"
              image="//cdn.mgbeta.ru/inessa/editorq/01.png" />

          <TemplateItem
              title="Вопрос и ответ с картинкой"
              description= "Предустановлено "
              link="#"
              image="//cdn.mgbeta.ru/inessa/editorq/02.png" />

          <TemplateItem
              title="Вопрос-изображение и ввод"
              description= "Предустановлено "
              link="#"
              image="//cdn.mgbeta.ru/inessa/editorq/03.png" />

        </Row>

        <Row>

          <TemplateItem
              title="Вопрос и ввод ответа"
              description= "Предустановлено "
              link="#"
              image="//cdn.mgbeta.ru/inessa/editorq/04.png" />
          <TemplateItem
              title="Видео вопрос"
              description= "Предустановлено "
              link="#"
              image="//cdn.mgbeta.ru/inessa/editorq/05.png" />

          <TemplateItem
            title="Свободный шаблон"
            description= "Пустой шаблон, все данные Вы выбираете самостоятельно"
            link="#"
            image="//cdn.mgbeta.ru/inessa/editorq/06.png" />
        </Row>
      </div>
    )
  }
}



class TemplateItem extends React.Component {
  render() {
    return (
      <Col md={4} lg={4}>
        <div className={styles.imageWrapper}>
          <h3>{this.props.title}</h3>
          <a href={this.props.link}>
            <img src={this.props.image} className="img-responsive img-rounded" alt={this.props.title}/>
          </a>
        </div>
      </Col>
    );
  }
}

TemplateItem.propTypes = {
  title: React.PropTypes.string,
  desciption: React.PropTypes.string,
  link: React.PropTypes.string,
  image:  React.PropTypes.string
}

TemplateItem.defaultProps = {
  title: 'title',
  desciption: 'description',
  link: '#',
  image: ''
}
