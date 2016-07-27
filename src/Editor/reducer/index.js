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

  // console.log('editorSet', action);

  const pathStr = path(['bemjson', ...action.path])
  const command = `state${pathStr}=${JSON.stringify(action.value)}`
  // console.log('test', pathStr, command);
  eval(command); // eslint-disable-line
  return state;
}

export function editorRemove(originState, action) {
  var state = _.cloneDeep(originState);
  var command = 'delete state.bemjson' + path(action.path) + ';';
  eval(command);

  return state;
}

export function editorRemoveElement(originState, action) {
  var state = _.cloneDeep(originState);
  var command = 'state.bemjson' + path(action.path) + '.splice(' + action.index + ', 1);';
  eval(command);
  return state;
}

export function editorSwap(originState, action) {
  const state = _.cloneDeep(originState);
  var value = null;
  eval('value = state.bemjson' + path(action.path) + ';');
  eval('state.bemjson' + path(action.path) + ' = state.bemjson' + path(action.pathTo) + ' ;');
  eval('state.bemjson' + path(action.pathTo) + ' = value;');

  return state;
}

export default function(state = {}, action) {
  console.log('reducer');
  switch (action.type) {

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
