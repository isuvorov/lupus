import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createClientMiddleware from './middleware/clientMiddleware';
// import { routerMiddleware } from 'react-router-redux';

export default function createStore(data, client, history) {
  // Sync dispatched route actions to the history
  // const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createClientMiddleware(client), /*reduxRouterMiddleware*/ ];
  // const middleware = [];

  let finalCreateStore;
  if (__DEV__ && __CLIENT__) {
  // if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    // const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      // window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer').default;
  const store = finalCreateStore(reducer, data);

  // console.log('module.hot', module.hot);

  if (__DEV__ && module.hot) {
    // console.log('__DEV__', __DEV__);
  // if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
