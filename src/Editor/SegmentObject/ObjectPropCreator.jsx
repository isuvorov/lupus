import { Component, PropTypes } from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { autobind } from 'core-decorators';

import linkState from 'react-link-state'
import IconPlus from 'react-icons/lib/fa/plus'

import cssm from '~/utils/CSSModules'
const style = require('./style.scss')

@cssm(style)
export default class ObjectPropCreator extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      key: '',
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
    return <div>
        <input valueLink={linkState(this, 'key')} placeholder="Key" bsSize="small" className="form-control creator-key" />
        <input valueLink={linkState(this, 'value')}  placeholder="Value"  bsSize="small" className="form-control creator-value" />
				<input valueLink={linkState(this, 'type')} placeholder="Type" bsSize="small" className="form-control creator-type" />
				<Button onClick={this.handleClick} bsStyle="primary" bsSize="small" className="creator-add">
	        <IconPlus /> Добавить объект
	      </Button>
      </div>
  }
}
