import React, { Component } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal bsSize='small' show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Создать проект</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId='formBasicText'>
            <ControlLabel>Название проекта</ControlLabel>
            <FormControl
              type='text'
              value={this.props.value}
              placeholder='Придумайте название'
              onChange={this.props.onChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={this.props.onSubmit}>Создать</Button>
          <Button onClick={this.closeModal}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
