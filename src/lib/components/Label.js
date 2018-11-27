import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Label extends Component {
  get showRemoveButton() {
    return !!this.props.onRemove;
  }

  render() {
    console.log(this.props.error);
    return (
      <div className="selected-label-wrapper">
        <span
          title={this.props.title && this.props.title}
          className={`selected-label${this.props.labelClassNames ? ' ' + this.props.labelClassNames : ''}${
            this.props.error ? ' error' : ''
          }`}
        >
          {this.props.value}
          {this.showRemoveButton && (
            <button onClick={() => this.props.onRemove(this.props.labelIndex)} className="remove-label">
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
  labelClassNames: PropTypes.string,
  labelIndex: PropTypes.number,
  onRemove: PropTypes.func,
  removeText: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Label.defaultProps = {
  error: false,
  removeText: '✖',
};
