import { Component } from 'react';
import App from '../App';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  render() {
    return <div>
      <App />
    </div>
  }
}
