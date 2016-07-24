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

export default class EditorBemjsonSegment extends Component {

  static propTypes = {
    bemjson: PropTypes.any.isRequired,
    path: PropTypes.array,
    dispatch: PropTypes.func,
    // schema: PropTypes.any
  }

  constructor(props) {
    super(props)
    this.state = {
      key: '',
      val: '',
      type: 'string',
    }
    if (this.getType() === 'simple') {
      this.state.val = this.props.bemjson;
    }

    this.handleChangeDebounced = _.debounce(this.handleChangeDebounced, 1000)
  }


  componentWillReceiveProps(nextProps) {
    if (this.getType() === 'simple') {
      this.setState({
        val: nextProps.bemjson,
      });
    }
    return false
  }

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
    const handleChangeDebounced = e => {
      this.handleChangeDebounced(e.target.value)
    }
    const handleChange = e => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.props.path,
        value: e.target.value,
      });
    }
    return <div>
      <input
        data-path={this.props.path.join('/')}
        type="text"
        className="form-control"
        value={this.props.bemjson}
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
            <EditorBemjsonModal onChange={onChange} bemjson={value} path={path}>
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

    const push = () => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(this.state.key),
        value: this.state.val,
      });
      this.setState({
        key: '',
        val: '',
      })
    }

    return <div className="well">
      {childs}
      <hr />
      <Row>
         <Col xs={3}>
          <input valueLink={linkState(this, 'key')} placeholder="Key" bsSize="small" className="form-control" />
         </Col>
         <Col xs={6}>
          <input valueLink={linkState(this, 'val')}  placeholder="Value"  bsSize="small" className="form-control" />
         </Col>
         <Col xs={2}>
          <input valueLink={linkState(this, 'type')} placeholder="Type" bsSize="small" className="form-control" />
         </Col>
         <Col xs={1}>
          <Button onClick={push} bsStyle="primary" bsSize="small">
            <IconPlus />
          </Button>
         </Col>
       </Row>
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
    // console.log('render', this.getType());

    return <div className="EditorBemjsonSegment">{content}</div>
  }
}

// ReactMixin(EditorBemjsonSegment.prototype, LinkedStateMixin);
