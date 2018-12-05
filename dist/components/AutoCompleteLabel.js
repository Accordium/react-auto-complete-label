import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Component } from 'react';
import SelectedLabels from './SelectedLabels';
import AutoCompleteInput from './AutoCompleteInput';
import LabelContainer from './LabelContainer';

var AutoCompleteLabel = function (_Component) {
  _inherits(AutoCompleteLabel, _Component);

  function AutoCompleteLabel() {
    var _this;

    _classCallCheck(this, AutoCompleteLabel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoCompleteLabel).call(this));
    _this.inputRef = React.createRef();
    _this.focus = _this.focus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AutoCompleteLabel, [{
    key: "focus",
    value: function focus() {
      if (this.inputRef.current) this.inputRef.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(LabelContainer, null, this.props.keyText && React.createElement("label", {
        className: "React_autocomplete_label__label",
        htmlFor: "auto-input-field"
      }, this.props.keyText), React.createElement("div", {
        className: "React_autocomplete_label__label-input-wrapper",
        ref: this.props.forwardedRef
      }, React.createElement(SelectedLabels, {
        selectedLabels: this.props.selectedLabels,
        onRemove: this.props.onRemove,
        labelClassNames: this.props.selectedLabelClassNames,
        readOnly: this.props.readOnly,
        focus: this.focus
      }), React.createElement(AutoCompleteInput, {
        ref: this.inputRef,
        onChange: this.props.onInputChange,
        onSelect: this.props.onSelect,
        onRemove: this.props.onRemove,
        onPaste: this.props.onPaste,
        lastSelectedLabelsIndex: this.lastSelectedLabelsIndex,
        value: this.props.inputValue,
        suggestions: this.props.suggestions,
        containerWidth: this.props.containerWidth,
        lastRowWidth: this.props.lastRowWidth,
        readOnly: this.props.readOnly,
        focus: this.focus
      })));
    }
  }, {
    key: "lastSelectedLabelsIndex",
    get: function get() {
      return this.props.selectedLabels.length - 1;
    }
  }]);

  return AutoCompleteLabel;
}(Component);

export default React.forwardRef(function (props, ref) {
  return React.createElement(AutoCompleteLabel, Object.assign({
    forwardedRef: ref
  }, props));
});