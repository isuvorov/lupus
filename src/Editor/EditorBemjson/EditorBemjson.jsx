import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Table, Modal, Button, Input } from 'react-bootstrap'
import _ from 'lodash'

import EditorBemjsonRoot from '../EditorBemjsonRoot'

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import reducer from '../reducer';


export default class EditorBemjson extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducer, {bemjson: this.props.value, schema: this.props.schema})
    this.store.subscribe(() => {
      this.props.onChange(this.store.getState().bemjson)
    })
  }

  // componentWillReceiveProps(props) {
  //   const state = this.store.getState()
  //   if( JSON.stringify([props.bemjson, props.schema]) != JSON.stringify([state.bemjson, state.schema]) ){
  //     this.store.dispatch({
  //       type: 'INIT',
  //       bemjson: props.value,
  //       schema: props.schema,
  //     })
  //   }
  // }

  render() {
    return <Provider store={this.store}>
      <EditorBemjsonRoot onSubmit={this.props.onSubmit}  />
    </Provider>
  }
}
