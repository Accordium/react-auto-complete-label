import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

export default class SelectedLabels extends Component {
  render() {
    const nonMandatoryProps = {
      hasError: this.props.hasError,
      onRemove: this.props.onRemove,
      removeText: this.props.removeText,
      labelClassNames: this.props.labelClassNames,
    };
    return this.props.selectedLabels.map((label, index) => (
      <Label key={index} labelIndex={index} value={label.value} title={label.title} {...nonMandatoryProps} />
    ));
  }
}

SelectedLabels.propTypes = {
  hasError: PropTypes.any,
  labelClassNames: PropTypes.string,
  onRemove: PropTypes.any,
  removeText: PropTypes.any,
  selectedLabels: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.any, value: PropTypes.string.isRequired, title: PropTypes.string })
  ).isRequired,
  title: PropTypes.any,
};
