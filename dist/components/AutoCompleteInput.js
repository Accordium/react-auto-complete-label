import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Component, Fragment } from 'react';
import { KEYS } from './constants';

var AutoCompleteInput = function (_Component) {
  _inherits(AutoCompleteInput, _Component);

  function AutoCompleteInput(props) {
    var _this;

    _classCallCheck(this, AutoCompleteInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoCompleteInput).call(this, props));
    _this.state = {
      activeIndex: null
    };
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSuggestionSelect = _this.onSuggestionSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.inputRef = React.createRef();
    _this.utilDivRef = React.createRef();
    return _this;
  }

  _createClass(AutoCompleteInput, [{
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      if (e.keyCode === KEYS.ENTER && this.state.activeIndex !== null) {
        var selectedSuggestion = this.props.suggestions[this.state.activeIndex];
        this.props.onSelect({
          value: selectedSuggestion.value,
          name: selectedSuggestion.name,
          optionalObject: selectedSuggestion.optionalObject
        });
        this.setState({
          activeIndex: null
        });
        return;
      }

      if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
        var selectedValue = this.props.value;
        if (e.keyCode === KEYS.COMMA) selectedValue = selectedValue.substr(0, selectedValue.length - 1);

        if (selectedValue) {
          this.props.onSelect({
            value: selectedValue
          });
          this.setState({
            activeIndex: null
          });
        }

        return;
      }

      if (this.props.suggestions.length > 0) {
        var lastSuggestionsIndex = this.props.suggestions.length - 1;
        var activeIndex = this.state.activeIndex;

        if (e.keyCode === KEYS.UP_ARROW) {
          if (activeIndex === 0) {
            activeIndex = null;
          } else if (activeIndex === null) {
            activeIndex = lastSuggestionsIndex;
          } else {
            activeIndex -= 1;
          }
        } else if (e.keyCode === KEYS.DOWN_ARROW) {
          if (activeIndex === null) {
            activeIndex = 0;
          } else if (activeIndex === lastSuggestionsIndex) {
            activeIndex = null;
          } else {
            activeIndex += 1;
          }
        }

        this.setState({
          activeIndex: activeIndex
        });
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (e.keyCode === KEYS.BACKSPACE && this.props.value === '') {
        this.props.onRemove && this.props.onRemove(this.props.lastSelectedLabelsIndex);
        return;
      }
    }
  }, {
    key: "onSuggestionSelect",
    value: function onSuggestionSelect(suggestion) {
      this.props.onSelect({
        value: suggestion.value,
        name: suggestion.name,
        optionalObject: suggestion.optionalObject
      });
      this.setState({
        activeIndex: null
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(Fragment, null, React.createElement("div", {
        className: "auto-complete-input wrapper",
        style: this.inputWrapperStyle
      }, React.createElement("input", {
        ref: this.inputRef,
        id: this.props.inputId,
        type: "text",
        className: "input-field".concat(!!this.props.error ? ' error' : ''),
        value: this.props.value,
        placeholder: this.props.placeholder && this.props.placeholder,
        onChange: function onChange(e) {
          return _this2.props.onChange(e.target.value);
        },
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        onBlur: function onBlur() {
          return _this2.setState({
            activeIndex: null
          });
        }
      }), React.createElement("div", {
        ref: this.utilDivRef,
        className: "input-field",
        style: this.utilDivStyle
      }, this.props.value)), this.props.suggestions.length > 0 && React.createElement("ul", {
        className: "suggestions"
      }, this.props.suggestions.map(function (suggestion, index) {
        return React.createElement("li", {
          className: "suggestion-item".concat(index === _this2.state.activeIndex ? ' active' : '', " "),
          key: index,
          onClick: function onClick() {
            return _this2.onSuggestionSelect(suggestion);
          }
        }, suggestion.avatarUrl && React.createElement("div", {
          className: "suggestion-avatar-wrapper"
        }, React.createElement("img", {
          className: "suggestion-avatar",
          src: suggestion.avatarUrl,
          alt: suggestion.value
        })), React.createElement("div", {
          className: "suggestion-name"
        }, suggestion.name), suggestion.value && React.createElement("div", {
          className: "suggestion-value"
        }, suggestion.value));
      }, this)));
    }
  }, {
    key: "inputWrapperStyle",
    get: function get() {
      if (this.props.lastRowWidth) {
        if (this.props.containerWidth) {
          var inputWidthLimit = this.props.containerWidth * 0.2;
          var inputWidth = this.props.containerWidth - (this.props.lastRowWidth + 10);
          if (inputWidth < inputWidthLimit) return {
            width: '100%',
            minWidth: "".concat(this.props.inputMinWidth, "px")
          };
        }

        return {
          width: "calc(100% - ".concat(this.props.lastRowWidth + 10, "px)"),
          minWidth: "".concat(this.props.inputMinWidth, "px")
        };
      }

      return {
        minWidth: "".concat(this.props.inputMinWidth, "px")
      };
    }
  }, {
    key: "utilDivStyle",
    get: function get() {
      return {
        position: 'absolute',
        visibility: 'hidden',
        height: 'auto',
        width: 'auto',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      };
    }
  }]);

  return AutoCompleteInput;
}(Component);

export { AutoCompleteInput as default };
AutoCompleteInput.defaultProps = {
  value: '',
  delimiters: [KEYS.ENTER, KEYS.COMMA],
  suggestions: [],
  placeholder: '',
  inputId: 'auto-input-field',
  inputMinWidth: 150,
  containerWidth: 0
};