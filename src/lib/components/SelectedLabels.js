import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

export default class SelectedLabels extends Component {
  render() {
    const nonMandatoryProps = {
      onRemove: !!this.props.readOnly ? undefined : this.props.onRemove,
      removeText: this.props.removeText,
      labelClassNames: this.props.labelClassNames,
      focus: this.props.focus,
    };
    return this.props.selectedLabels.map((label, index) => (
      <Label key={index} labelIndex={index} value={label.value} name={label.name} error={label.error} {...nonMandatoryProps} />
    ));
  }
}

SelectedLabels.propTypes = {
  focus: PropTypes.func,
  labelClassNames: PropTypes.string,
  onRemove: PropTypes.any,
  readOnly: PropTypes.bool,
  readonly: PropTypes.bool,
  removeText: PropTypes.any,
  selectedLabels: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string, error: PropTypes.bool })
  ).isRequired,
  title: PropTypes.any,
};

SelectedLabels.defaultProps = {
  readonly: false,
};
