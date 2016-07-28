import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Table, Modal, Button, Input } from 'react-bootstrap'

import EditorBemjsonSegment from '../EditorBemjsonSegment'

import { autobind } from 'core-decorators';
import { connect } from 'react-redux'

@connect(
  state => ({
    // state,
    value: state.value,
    schema: state.schema,
  }),
  dispatch => ({
    dispatch,
  })
)
export default class EditorBemjsonRoot extends Component{

  @autobind
  handleClickSave() {
    this.props.onSubmit && this.props.onSubmit(this.props.value)
  }

  render() {
    return <div>
      <h1>Editor</h1>
      <EditorBemjsonSegment
        value={this.props.value}
        schema={this.props.schema}
        dispatch={this.props.dispatch}
      />
      <Button onClick={this.handleClickSave} bsStyle='success'>
          Сохранить
      </Button>
    </div>
  }
}
