import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectedLabels from './SelectedLabels';
import AutoCompleteInput from './AutoCompleteInput';
import LabelContainer from './LabelContainer';

class AutoCompleteLabel extends Component {
  get lastSelectedLabelsIndex() {
    return this.props.selectedLabels.length - 1;
  }

  render() {
    return (
      <div className="auto-complete-label container">
        <LabelContainer>
          {this.props.keyText && (
            <label className="label" htmlFor="auto-input-field">
              {this.props.keyText}
            </label>
          )}
          <div className="label-input-wrapper" ref={this.props.forwardedRef}>
            <SelectedLabels
              selectedLabels={this.props.selectedLabels}
              onRemove={this.props.onRemove}
              labelClassNames={this.props.selectedLabelClassNames}
            />
            <AutoCompleteInput
              onChange={this.props.onInputChange}
              onSelect={this.props.onSelect}
              onRemove={this.props.onRemove}
              lastSelectedLabelsIndex={this.lastSelectedLabelsIndex}
              value={this.props.inputValue}
              suggestions={this.props.suggestions}
              containerWidth={this.props.containerWidth}
              lastRowWidth={this.props.lastRowWidth}
            />
          </div>
        </LabelContainer>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <AutoCompleteLabel forwardedRef={ref} {...props} />);

AutoCompleteLabel.propTypes = {
  containerWidth: PropTypes.number,
  forwardedRef: PropTypes.object,
  inputValue: PropTypes.string.isRequired,
  keyText: PropTypes.string,
  lastRowWidth: PropTypes.any,
  onInputChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  selectedLabels: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string })
  ).isRequired,
  selectedLabelClassNames: PropTypes.string,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string })
  ).isRequired,
};
