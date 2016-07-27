import { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { autobind } from 'core-decorators';

import linkState from 'react-link-state'
import IconPlus from 'react-icons/lib/fa/plus'


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
