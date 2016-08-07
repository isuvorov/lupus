import _ from 'lodash'

function path(pathArray) {
  // if (pathArray.length === 0) return ''
  const pathEval = pathArray.map((val, index) => {
    if (index === 0 && val === '#') return '\'value\''
    if (typeof val === 'string') {
      return `'${val}'`;
    }
    return val;
  }).join('][')
  return `[${pathEval}]`;
}

export function editorSet(originState, action) {
  const state = _.cloneDeep(originState)
  const pathStr = path(action.path)
  const command = `state${pathStr}=${JSON.stringify(action.value)}`
  eval(command) // eslint-disable-line
  return state
}

export function editorRemove(originState, action) {
  const state = _.cloneDeep(originState)
  const command = 'delete state' + path(action.path) + ';'
  eval(command) // eslint-disable-line
  return state
}

export function editorRemoveElement(originState, action) {
  const state = _.cloneDeep(originState)
  const command = 'state' + path(action.path) + '.splice(' + action.index + ', 1);'
  eval(command) // eslint-disable-line
  return state
}

export function editorSwap(originState, action) {
  const state = _.cloneDeep(originState)
  var cache = null // eslint-disable-line
  eval('cache = state' + path(action.path) + ';') // eslint-disable-line
  eval('state' + path(action.path) + ' = state' + path(action.pathTo) + ' ;') // eslint-disable-line
  eval('state' + path(action.pathTo) + ' = cache;') // eslint-disable-line
  return state;
}

export default function (state = {}, action) {
  console.log('state, action', state, action);
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
