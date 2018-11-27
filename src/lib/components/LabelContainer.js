import React, { Component } from 'react';

export default class LabelContainer extends Component {
  render() {
    return <div className="auto-complete-label container">{this.props.children}</div>;
  }
}
