import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';

export default function createStore(client, data) {
  // const middleware = createMiddleware(client);

  // const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  // if (__DEV__) {
  //   const { persistState } = require('redux-devtools');
  //   // const DevTools = require('../containers/DevTools/DevTools');
  //   finalCreateStore = compose(
  //     applyMiddleware(...middleware),
  //     // window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  //     // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  //   )(_createStore);
  // } else {
    // finalCreateStore = applyMiddleware(...middleware)(_createStore);
  // }

  const reducer = require('./modules/reducer');
  // const store = finalCreateStore(reducer, data);


  // if (__DEV__ && module.hot) {
  //   module.hot.accept('./modules/reducer', () => {
  //     store.replaceReducer(require('./modules/reducer'));
  //   });
  // }

  return { reducer, data };
}
