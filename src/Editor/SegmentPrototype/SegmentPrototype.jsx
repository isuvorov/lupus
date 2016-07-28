import { Component, PropTypes } from 'react'
import _ from 'lodash'
import { debounce } from 'core-decorators';

export default class SegmentPrototype extends Component {

  static propTypes = {
    schema: PropTypes.object,
    value: PropTypes.any.isRequired,
    path: PropTypes.array,
    dispatch: PropTypes.func,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) return true
    if (JSON.stringify(nextProps.value) === JSON.stringify(this.props.value)) return false
    return true
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

  getSuperType() {
    const value = this.props.value
    if (_.isArray(value)) {
      return 'array'
    } else if (_.isPlainObject(value)) {
      return 'object'
    }
    return 'simple'
  }

  getSchema(key = null) {
    if (!this.props.schema) return null
    const schema = this.props.schema
    if (key !== null) {
      if (schema.properties) {
        return schema.properties[key]
      }
      if (schema.items) {
        return schema.items
      }
      return null
    }
    return schema
  }

  getType() {
    const schema = this.getSchema()
    if (!schema) return null
    return schema.type
  }

  getFormat() {
    const schema = this.getSchema()
    if (!schema) return null
    return schema.format
  }

}
