import _classCallCheck from "/home/virandry/accordium/project/react-auto-complete-label/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/virandry/accordium/project/react-auto-complete-label/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/virandry/accordium/project/react-auto-complete-label/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/virandry/accordium/project/react-auto-complete-label/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/virandry/accordium/project/react-auto-complete-label/node_modules/@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import Label from './Label';

var SelectedLabels = function (_Component) {
  _inherits(SelectedLabels, _Component);

  function SelectedLabels() {
    _classCallCheck(this, SelectedLabels);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectedLabels).apply(this, arguments));
  }

  _createClass(SelectedLabels, [{
    key: "render",
    value: function render() {
      var nonMandatoryProps = {
        onRemove: this.props.onRemove,
        removeText: this.props.removeText,
        labelClassNames: this.props.labelClassNames
      };
      return this.props.selectedLabels.map(function (label, index) {
        return React.createElement(Label, Object.assign({
          key: index,
          labelIndex: index,
          value: label.value,
          name: label.name,
          error: label.error
        }, nonMandatoryProps));
      });
    }
  }]);

  return SelectedLabels;
}(Component);

export { SelectedLabels as default };