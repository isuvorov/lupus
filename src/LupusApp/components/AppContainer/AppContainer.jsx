import React, { Component } from 'react';

import Grid from 'react-bootstrap/lib/Grid';

import App from '../App';
import Leftbar from '../Leftbar';
import Header from '../Header';

import cssm from '~/utils/CSSModules';
const style = require('./AppContainer.scss');

@cssm(style)
export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  render() {
    return (
      <main styleName="root">
        <Grid>
          <Leftbar user={this.props.user} />
          <section styleName="container">
            <Header />
            <App projects={this.props.projects} />
          </section>
        </Grid>
      </main>
    );
  }
}
