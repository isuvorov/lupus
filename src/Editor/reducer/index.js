import _ from 'lodash'

function path(pathArray) {
  const pathEval = pathArray.map((val) => {
    if (typeof val === 'string') {
      return `'${val}'`;
    }
    return val;
  }).join('][')
  return `[${pathEval}]`;
}

export function editorSet(originState, action) {
  const state = _.cloneDeep(originState)
  const pathStr = path(['value', ...action.path])
  const command = `state${pathStr}=${JSON.stringify(action.value)}`
  eval(command) // eslint-disable-line
  return state
}

export function editorRemove(originState, action) {
  const state = _.cloneDeep(originState)
  const command = 'delete state.value' + path(action.path) + ';'
  eval(command) // eslint-disable-line
  return state
}

export function editorRemoveElement(originState, action) {
  const state = _.cloneDeep(originState)
  const command = 'state.value' + path(action.path) + '.splice(' + action.index + ', 1);'
  eval(command) // eslint-disable-line
  return state
}

export function editorSwap(originState, action) {
  const state = _.cloneDeep(originState)
  var value = null // eslint-disable-line
  eval('value = state.value' + path(action.path) + ';') // eslint-disable-line
  eval('state.value' + path(action.path) + ' = state.value' + path(action.pathTo) + ' ;') // eslint-disable-line
  eval('state.value' + path(action.pathTo) + ' = value;') // eslint-disable-line
  return state;
}

export default function (state = {}, action) {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        value: action.value,
        schema: action.schema,
      }
    case 'editorSwap':
      return editorSwap(state, action)
    case 'editorSet':
      return editorSet(state, action)
    case 'editorRemove':
      return editorRemove(state, action)
    case 'editorRemoveElement':
      return editorRemoveElement(state, action)
    default:
      return state;
  }
}
