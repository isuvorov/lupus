import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Table, Modal, Button, Input } from 'react-bootstrap'

import _ from 'lodash';
import linkState from 'react-link-state'
import { autobind } from 'core-decorators';

import IconCode from 'react-icons/lib/fa/code'
import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

export default class EditorBemjsonModal extends Component {
  static propTypes = {
    bemjson: PropTypes.any.isRequired,
    path: PropTypes.array,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      value: props.value,
      str: JSON.stringify(props.value),
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value,
      str: JSON.stringify(props.value),
    });
  }

  @autobind
  saveAndClose() {
    try{
      const value = JSON.parse(this.state.str)

      this.setState({ showModal: false }, () => {
        this.props.onChange(value)
      });
    }catch(e){
      console.log(e);
      alert('JSON ERROR')
    }

  }

  @autobind
  close() {
    this.setState({ showModal: false });
  }

  @autobind
  open() {
    this.setState({ showModal: true });
  }

  @autobind
  handleChange(e) {
    console.log('e.target.value', e.target.value);
    this.setState({
      str: e.target.value
    })
  }

  stringify(value) {
    return JSON.stringify(value)
  }

  parse(value) {
    return JSON.parse(value)
  }

  render() {
    return <span>
      <Button
        bsStyle="primary"
        bsSize="small"
        onClick={this.open}
      >
        {this.props.children}
      </Button>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование {JSON.stringify(this.props.path)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="textarea"
            label="Text Area"
            placeholder="textarea"
            value={this.state.str}
            onChange={this.handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Отменить</Button>
          <Button onClick={this.saveAndClose} bsStyle="primary">Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </span>
  }
}
