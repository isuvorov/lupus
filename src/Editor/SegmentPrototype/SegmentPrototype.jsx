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
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) return true
    if (JSON.stringify(nextProps.value) === JSON.stringify(this.props.value)) return false
    return true
  }

  //
  // dispatch(action) {
  //   if (this.props.dispatch) {
  //     this.props.dispatch(action)
  //   } else {
  //     console.log('dispatch', action);
  //   }
  // }
  //
  // @debounce(300)
  // handleChangeDebounced(value) {
  //   this.props.dispatch({
  //     type: 'editorSet',
  //     path: this.props.path,
  //     value,
  //   });
  // }

  getPath(...keys) {
    const path = this.props.path ? _.clone(this.props.path) : []
    keys.forEach(key => path.push(key))
    return path
  }

  getValue(key = null) {
    if (key === null) return this.props.value
    return this.props.value[key]
  }

  getValueType(key) {
    const value = this.getValue(key)
    if (_.isArray(value)) {
      return 'array'
    } else if (_.isPlainObject(value)) {
      return 'object'
    }
    return 'simple'
  }

  getSuperType(value = this.props.value) {
    // const value = this.props.value
    if (_.isArray(value)) {
      return 'array'
    } else if (_.isPlainObject(value)) {
      return 'object'
    }
    return 'simple'
  }

  getSample(schema) {
    let value
    if (!schema || !schema.type) return null
    if (schema.type === 'object') {
      value = {}
      _.forEach(schema.properties || {}, (val, key) => {
        value[key] = this.getSample(val)
      })
      return value
    }
    if (schema.type === 'array') {
      return [this.getSample(schema.items)]
    }
    if (schema.type === 'number') {
      return 0
    }
    if (schema.type === 'string') {
      return ''
    }
    return null

    // value = []
    //
    // return schema
    // this.getSuperType()
    // const value = this.props.value
    // if (_.isArray(value)) {
    //   return 'array'
    // } else if (_.isPlainObject(value)) {
    //   return 'object'
    // }
    // return 'simple'
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

  isComplexType(key) {
    return this.getValueType(key) !== 'simple'
    console.log(key, this.getSuperType(key), this.getValueType(key) !== 'simple');
    return true
    return this.getSuperType(key) !== 'simple'
  }

  getActions(key) {
    const dispatch = this.props.dispatch
    const actionSet = (value) => {
      dispatch({
        type: 'editorSet',
        path: this.getPath(key),
        value,
      });
    }
    // const actionSetDebounced = debounce(300)(actionSet)
    const actionSetDebounced = actionSet
    switch (this.getValueType(key)) {
      case 'array':
        return {
          actionPush: () => {
            const key2 = this.getValue(key).length
            const schema = this.getSchema(key, key2)
            console.log(key, key2, {
              type: 'editorSet',
              path: this.getPath(key, key2),
              value: this.getSample(schema),
            });
            dispatch({
              type: 'editorSet',
              path: this.getPath(key, key2),
              value: this.getSample(schema),
            });
          },
          actionSet,
        }
      case 'object':
        return {
          actionAddProp: (pack) => {
            const key2 = pack.key
            const value = pack.value || this.getSample(schema)
            const schema = this.getSchema(key, key2)
            dispatch({
              type: 'editorSet',
              path: this.getPath(key, key2),
              value,
            });
            return;
            console.log({
              type: 'editorSet',
              path: this.getPath(key, key2),
              value,
            });
            dispatch({
              type: 'editorSet',
              path: this.getPath(key, key2),
              value,
            });
          },
          actionSet,
        }
      case 'simple':
      default:
        return {
          actionSet: actionSetDebounced,
        }
    }
  }
  getSpecialActions(key) {
    const dispatch = this.props.dispatch
    const parentType = this.getValueType()
    switch (parentType) {
      case 'array':
        return {
          actionUp: () => {
            dispatch({
              type: 'editorSwap',
              path: this.getPath(key),
              pathTo: this.getPath(key - 1),
            })
          },
          actionDown: () => {
            this.props.dispatch({
              type: 'editorSwap',
              path: this.getPath(key),
              pathTo: this.getPath(key + 1),
            });
          },
          actionRemove: () => {
            this.props.dispatch({
              type: 'editorRemoveElement',
              path: this.props.path,
              index: key,
            });
          },
        }
      case 'object':
        if (!this.props.path || !this.props.path.length || !this.props.path.length === 1) {
          return {}
        }
        return {
          // actionAddProp: () => {},
          actionRemove: () => {
            this.props.dispatch({
              type: 'editorRemove',
              path: this.getPath(key),
            });
          },
        }
      default:
        return {}
    }
  }

  getChildProps(key) {
    const path = this.getPath(key)
    const schema = this.getSchema(key)
    const value = this.getValue(key)
    return {
      title: 'Title: ' + path.join('/'),
      path,
      schema,
      value,
      parent: this.props,
      dispatch: this.props.dispatch,
      ...this.getSpecialActions(key),
      ...this.getActions(key),
      specialActions: this.getSpecialActions(key),
      actions: this.getActions(key),
    }
  }

}
