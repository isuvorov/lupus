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
      bemjson: props.bemjson,
    }
  }

  @autobind
  saveAndClose() {
    const bemjson = JSON.parse(this.state.bemjson)
    this.setState({ showModal: false }, () => {
      this.props.onChange(bemjson)
    });
    // this.close()
  }

  @autobind
  close() {
    this.setState({ showModal: false });
  }

  @autobind
  open() {
    this.setState({ showModal: true });
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
            ref="bemjson"
            //valueLink={linkState(this, 'bemjson')}
            defaultValue={JSON.stringify(this.state.bemjson)}
          />
          {/*props
          <textarea value={JSON.stringify(this.props.bemjson)} />
          state
          <textarea value={JSON.stringify(this.state.bemjson)} />*/}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Отменить</Button>
          <Button onClick={this.saveAndClose} bsStyle="primary">Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </span>
  }
}
