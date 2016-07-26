import React, { Component } from 'react';

import cssm from '~/utils/CSSModules';
const style = require('./Leftbar.scss');

@cssm(style)
export default class Leftbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section styleName="container">
        <p>KEK</p>
      </section>
    );
  }
}
