import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col, Table, Modal, Button, Input } from 'react-bootstrap'
import _ from 'lodash'
import linkState from 'react-link-state'
import { autobind, debounce } from 'core-decorators';

import IconCode from 'react-icons/lib/fa/code'
import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonModal from './EditorBemjsonModal'
import InputDebounce from './InputDebounce'


class ObjectPropCreator extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      key: '1',
      value: '',
      type: 'string',
    }
  }

  @autobind
  handleClick() {
    this.props.onSubmit(this.state)
    this.setState({
      key: '',
      value: '',
    })
  }

  render() {
    return <Row>
     <Col xs={3}>
      <input valueLink={linkState(this, 'key')} placeholder="Key" bsSize="small" className="form-control" />
     </Col>
     <Col xs={6}>
      <input valueLink={linkState(this, 'value')}  placeholder="Value"  bsSize="small" className="form-control" />
     </Col>
     <Col xs={2}>
      <input valueLink={linkState(this, 'type')} placeholder="Type" bsSize="small" className="form-control" />
     </Col>
     <Col xs={1}>
      <Button onClick={this.handleClick} bsStyle="primary" bsSize="small">
        <IconPlus />
      </Button>
     </Col>
   </Row>
  }
}

export default class EditorBemjsonSegment extends Component {

  static propTypes = {
    bemjson: PropTypes.any.isRequired,
    path: PropTypes.array,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props)
    // this.state = {
    //   key: '123123',
    //   value: '',
    //   type: 'string',
    // }
  }



  // componentWillReceiveProps(nextProps) {
  //   if (this.getType() === 'simple') {
  //     this.setState({
  //       val: nextProps.bemjson,
  //     });
  //   }
  //   return false
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // return false
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) return true
    if (JSON.stringify(nextProps.bemjson) === JSON.stringify(this.props.bemjson)) return false
    console.log(JSON.stringify(nextProps.bemjson) !== JSON.stringify(this.props.bemjson), nextProps.bemjson , this.props.bemjson);
    // console.log(nextProps.bemjson !== this.props.bemjson, nextProps.bemjson , this.props.bemjson);
    return true
    // return JSON.stringify(nextProps.bemjson) !== JSON.stringify(this.props.bemjson)
  }

  @debounce(300)
  handleChangeDebounced(value) {
    this.props.dispatch({
      type: 'editorSet',
      path: this.props.path,
      value,
    });
  }

  getPath(key) {
    const path = this.props.path ? _.clone(this.props.path) : []
    path.push(key)
    return path
  }

  getType() {
    const bemjson = this.props.bemjson
    if (_.isArray(bemjson)) {
      return 'array'
    } else if (_.isPlainObject(bemjson)) {
      return 'object'
    }
    return 'simple'
  }

  renderSimple() {
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

  renderObject() {
    const childs = _.map(this.props.bemjson, (value, key) => {
      const path = this.getPath(key);

      const remove = () => {
        this.props.dispatch({
          type: 'editorRemove',
          path,
        });
      }

      // change in modal
      const onChange = (bemjson) => {
        console.log('onChange', bemjson);
        this.props.dispatch({
          type: 'editorSet',
          path,
          value: bemjson,
        });
      }

      return (
        <div key={key}>
          <label className=" control-label">
            {key}
            &nbsp;
            <EditorBemjsonModal onChange={onChange} value={value} path={path}>
              <IconCode />
            </EditorBemjsonModal>
            &nbsp;
            <Button onClick={remove} bsStyle="danger" bsSize="small">
              <IconClose />
            </Button>
          </label>
          <br />
          <EditorBemjsonSegment bemjson={value} path={path} dispatch={this.props.dispatch} />
        </div>
      );
    })

    const push = (state) => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(state.key),
        value: state.value,
      });
    }

    return <div className="well">
      {childs}
      <hr />
      <ObjectPropCreator onSubmit={push} />
    </div>
  }

  renderArray() {
    const last = this.props.bemjson.length - 1;
    const childs = _.map(this.props.bemjson, (value, key) => {
      const path = this.getPath(key);

      const up = () => {
        this.props.dispatch({
          type: 'editorSwap',
          path,
          pathTo: this.getPath(key - 1),
        });
      }

      const down = () => {
        this.props.dispatch({
          type: 'editorSwap',
          path,
          pathTo: this.getPath(key + 1),
        });
      }

      const remove = () => {
        this.props.dispatch({
          type: 'editorRemoveElement',
          path: this.props.path,
          index: key,
        });
      }

      // ЛЮБОЕ СЛОВО, ТЕЛО СЕГМЕНТА
      return <tbody key={key}>
        <tr>
          <td>
            {key}
          </td>
          <td>
            <EditorBemjsonSegment bemjson={value} path={path} dispatch={this.props.dispatch} />
          </td>
          <td>
            <Button bsStyle="primary" bsSize="small" onClick={up} disabled={key === 0}>
              <IconArrowUp />
            </Button>
            <Button bsStyle="primary" bsSize="small" onClick={down} disabled={key === last}>
              <IconArrowDown />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={remove}>
              <IconClose />
            </Button>
          </td>
        </tr>
      </tbody>
    });

    const push = () => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(this.props.bemjson.length),
        value: '',
      });
    }

    return <div>
      <Table striped bordered condensed hover>
        {childs}
      </Table>
      <Button bsStyle="success" bsSize="small" onClick={push} >
        <IconPlus />
      </Button>
    </div>
  }

  render() {
    let content
    switch (this.getType()) {
      case 'array':
        content = this.renderArray();
        break;
      case 'object':
        content = this.renderObject();
        break;
      case 'simple':
      default:
        content = this.renderSimple();
        break;
    }

    return <div className="EditorBemjsonSegment">{content}</div>
  }
}
