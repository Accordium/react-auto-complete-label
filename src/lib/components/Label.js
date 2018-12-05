import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Label extends Component {
  get showRemoveButton() {
    return !!this.props.onRemove;
  }

  render() {
    return (
      <div className="React_autocomplete_label__selected-label-wrapper">
        <span
          title={this.props.name ? this.props.value : undefined}
          className={`React_autocomplete_label__selected-label${this.props.labelClassNames ? ' ' + this.props.labelClassNames : ''}${
            this.props.error ? ' error' : ''
          }`}
        >
          {this.props.name ? this.props.name : this.props.value}
          {this.showRemoveButton && (
            <button
              onClick={() => this.props.onRemove(this.props.labelIndex, this.props.focus)}
              className="React_autocomplete_label__remove-label"
            >
              {this.props.removeText}
            </button>
          )}
        </span>
      </div>
    );
  }
}

Label.propTypes = {
  error: PropTypes.bool,
  focus: PropTypes.func,
  labelClassNames: PropTypes.string,
  labelIndex: PropTypes.number,
  name: PropTypes.string,
  onRemove: PropTypes.func,
  removeText: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Label.defaultProps = {
  error: false,
  removeText: '✖',
};
