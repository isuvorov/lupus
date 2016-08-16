import { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import s from './App.css'
// import MethodsApi from '../routes/methods';
// const client = new MethodsApi({ base: 'http://localhost:8080/api/' });
import createStore from '../redux/createStore'
import ApiClient from '../ApiClient'
import Header from '../components/Header'

// const store = createStore((state = {}, action) => {
//   console.log('reducer');
//   return state;
// }, {test : 'test123123'})
// const store = createStore(_browserHistory, client, window.__data);

// @connect((state) => {
//   return {
//     state: state,
//   }
// })
// class Test extends Component {
//   render() {
//     return <div>
//       {this.props.test}
//       TEST
//       {this.props.asdasd}
//     </div>
//   }
// }
export default class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }
  componentWillMount() {
    const initialStore = {
      test : 'test123123',
      // auth: {
      //   user: "qweqweqwe",
      // },
    }

    const client = new ApiClient({ base: 'http://localhost:8080/api/' });

    if(__CLIENT__) {
      this.store = createStore(window.__data || initialStore, client);
    } else {
      this.store = createStore(initialStore, client);
    }

    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    return <div className='root'>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
      {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" /> */}
      <Header />
      <Provider store={this.store}>
        <Grid>
          {this.props.children}
        </Grid>
      </Provider>
    </div>
  }
}


//
// export default class App extends Component {
//   render() {
//     const store = createStore(() => {
//       console.log('reducer');
//     }, {test : 123123})
//     console.log('store', store);
//     return<CssWrapper context={this.props.context || this.context}>
//         <Provider store={store}>
//           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
//           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
//           {this.props.children}
//         </Provider>
//     </CssWrapper>
//
//   }
// }
