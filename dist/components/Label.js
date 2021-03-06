import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';

var Label = function (_Component) {
  _inherits(Label, _Component);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, _getPrototypeOf(Label).apply(this, arguments));
  }

  _createClass(Label, [{
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement("div", {
        className: "React_autocomplete_label__selected-label-wrapper"
      }, React.createElement("span", {
        title: this.props.name ? this.props.value : undefined,
        className: "React_autocomplete_label__selected-label".concat(this.props.labelClassNames ? ' ' + this.props.labelClassNames : '').concat(this.props.error ? ' error' : '')
      }, this.props.name ? this.props.name : this.props.value, this.showRemoveButton && React.createElement("button", {
        onClick: function onClick() {
          return _this.props.onRemove(_this.props.labelIndex, _this.props.focus);
        },
        className: "React_autocomplete_label__remove-label"
      }, this.props.removeText)));
    }
  }, {
    key: "showRemoveButton",
    get: function get() {
      return !!this.props.onRemove;
    }
  }]);

  return Label;
}(Component);

export { Label as default };
Label.defaultProps = {
  error: false,
  removeText: '✖'
};