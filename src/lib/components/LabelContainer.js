import React, { Component } from 'react';

export default class LabelContainer extends Component {
  render() {
    return <div className="React_autocomplete_label__container">{this.props.children}</div>;
  }
}
