import React, { Component } from 'react'
import _ from 'lodash'

export default class InputDebounce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || this.props.defaultValue
    }
    this.onChangeDebounced = _.debounce(this.props.onChange, this.props.debounce || 100)
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value || props.defaultValue,
    });
  }

  hangleChange(e) {
    this.setState({
      value: e.target.value,
    })
    this.onChangeDebounced(e.target.value)
  }

  render() {
    return <input
      {...this.props}
      value={this.state.value}
      onChange={this.hangleChange.bind(this)}
    />
    // return <span>
    //   {this.props.defaultValue}
    //   {this.state.value}
    //   <input
    //     {...this.props}
    //     value={this.state.value}
    //     onChange={this.hangleChange.bind(this)}
    //   />
    // </span>
  }
}

// How to use
/*
  render() {
    const handleChange = value => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.props.path,
        value,
      });
    }
    return <div>
      <InputDebounce
        type="text"
        className="form-control"
        ref="input"
        defaultValue={this.props.bemjson}
        onChange={handleChange}
      />
    </div>
  }
*/
