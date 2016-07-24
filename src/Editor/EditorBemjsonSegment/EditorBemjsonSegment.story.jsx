import EditorBemjsonSegment from './EditorBemjsonSegment';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { Component } from 'react'

import reducer from '../reducer';

@connect(
    state => ({
      bemjson: state.bemjson,
    }),
    dispatch => ({
      dispatch,
    })
)
class Test extends Component {
  render() {
    return <div>
      Test
      <pre style={{maxWidth:500}}>{JSON.stringify(this.props)}</pre>
      <pre style={{maxWidth:500}}>{JSON.stringify(this.state)}</pre>
      <EditorBemjsonSegment
        bemjson={this.props.bemjson}
        dispatch={this.props.dispatch}
      />
    </div>
  }
}

const bemjson = {
  int: 123,
  float: 123.45,
  string: 'Test string',
  intArray: [0, 1, 2, 3, 4, 5],
}
const largeBemjson = {
  int: 123,
  float: 123.45,
  string: 'Test string',
  intArray: [0, 1, 2, 3, 4, 5],
  intArray2: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray3: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray4: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray5: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  object: {
    int: 123,
    float: 123.45,
    string: 'Test string',
    intArray: [0, 1, 2, 3, 4, 5],
  },
  objectArray: [
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
  ],
}

module.exports = ({ storiesOf, action }) => {
  return storiesOf('EditorBemjsonSegment', module)
    .add('Default', () => {
      return <EditorBemjsonSegment
        bemjson={bemjson}
        dispatch={action('dispatch')}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('Redux', () => {
      const store = createStore(reducer, {bemjson})
      return <Provider store={store}>
        <Test />
      </Provider>
    })
    .add('Redux largeBemjson', () => {
      const store = createStore(reducer, {bemjson: largeBemjson})
      return <Provider store={store}>
        <Test />
      </Provider>
    })
}
