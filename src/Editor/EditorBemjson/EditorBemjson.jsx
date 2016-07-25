import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Table, Modal, Button, Input } from 'react-bootstrap'
import _ from 'lodash'

import EditorBemjsonSegment from '../EditorBemjsonSegment'

import { autobind } from 'core-decorators';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import reducer from '../reducer';


@connect(
  state => ({
    bemjson: state.bemjson,
  }),
  dispatch => ({
    dispatch,
  })
)
class EditorBemjsonSegmentConnected extends Component{

  @autobind
  handleClickSave() {
    this.props.onSubmit(this.props.bemjson)
    console.log(this.props.bemjson);
  }

  render() {
    return <div>
      <EditorBemjsonSegment bemjson={this.props.bemjson} dispatch={this.props.dispatch}/>
      <Button onClick={this.handleClickSave} bsStyle='success'>
          Сохранить
      </Button>
    </div>
  }
}

export default class EditorBemjson extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.store = createStore(reducer, {bemjson: this.props.bemjson})
    this.store.subscribe(() => {
      this.props.onChange(this.store.getState().bemjson)
      // console.log('subscribe', this.store.getState().bemjson);
      // onSubmit={this.props.onSubmit}
    })
  }

  render() {
    return <Provider store={this.store}>
      <EditorBemjsonSegmentConnected onSubmit={this.props.onSubmit}  />
    </Provider>
  }
}
