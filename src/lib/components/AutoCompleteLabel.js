import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectedLabels from './SelectedLabels';
import AutoCompleteInput from './AutoCompleteInput';
import LabelContainer from './LabelContainer';

class AutoCompleteLabel extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.focus = this.focus.bind(this)
  }
  get lastSelectedLabelsIndex() {
    return this.props.selectedLabels.length - 1;
  }

  focus() {
    if (this.inputRef.current) this.inputRef.current.focus()
  }

  render() {
    return (
      <LabelContainer>
        {this.props.keyText && (
          <label className="React_autocomplete_label__label" htmlFor="auto-input-field">
            {this.props.keyText}
          </label>
        )}
        <div className="React_autocomplete_label__label-input-wrapper" ref={this.props.forwardedRef}>
          <SelectedLabels
            selectedLabels={this.props.selectedLabels}
            onRemove={this.props.onRemove}
            labelClassNames={this.props.selectedLabelClassNames}
            readOnly={this.props.readOnly}
            focus={this.focus}
          />
          <AutoCompleteInput
            ref={this.inputRef}
            onChange={this.props.onInputChange}
            onSelect={this.props.onSelect}
            onRemove={this.props.onRemove}
            onPaste={this.props.onPaste}
            lastSelectedLabelsIndex={this.lastSelectedLabelsIndex}
            value={this.props.inputValue}
            suggestions={this.props.suggestions}
            containerWidth={this.props.containerWidth}
            lastRowWidth={this.props.lastRowWidth}
            readOnly={this.props.readOnly}
            focus={this.focus}
          />
        </div>
      </LabelContainer>
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
  onPaste: PropTypes.func,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  selectedLabelClassNames: PropTypes.string,
  selectedLabels: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string })).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string })).isRequired,
};
