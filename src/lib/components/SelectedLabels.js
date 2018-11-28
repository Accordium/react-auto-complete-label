import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

export default class SelectedLabels extends Component {
  render() {
    const nonMandatoryProps = {
      onRemove: this.props.onRemove,
      removeText: this.props.removeText,
      labelClassNames: this.props.labelClassNames,
    };
    return this.props.selectedLabels.map((label, index) => (
      <Label key={index} labelIndex={index} value={label.value} name={label.name} error={label.error} {...nonMandatoryProps} />
    ));
  }
}

SelectedLabels.propTypes = {
  labelClassNames: PropTypes.string,
  onRemove: PropTypes.any,
  removeText: PropTypes.any,
  selectedLabels: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string, error: PropTypes.bool })
  ).isRequired,
  title: PropTypes.any,
};
