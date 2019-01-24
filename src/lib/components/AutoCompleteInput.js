import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { KEYS } from './constants';

class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: null };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnPaste = this.handleOnPaste.bind(this);
    this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.utilDivRef = React.createRef();
    this._focus = false;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      event.target.className !== 'React_autocomplete_label__remove-label' &&
      event.target.className !== 'React_autocomplete_label__suggestions' &&
      event.target.className !== 'React_autocomplete_label__input-field' &&
      event.target.className !== 'React_autocomplete_label__input-field error' &&
      event.target.className !== 'React_autocomplete_label__suggestion-item'
    ) {
      let selectedValue = this.props.value;
      if (selectedValue) {
        this.props.onSelect({ value: selectedValue });
        this.setState({ activeIndex: null });
      }
    }
    this._focus = false;
  }

  get inputWrapperStyle() {
    if (this.props.lastRowWidth) {
      if (this.props.containerWidth) {
        const inputWidthLimit = this.props.containerWidth * 0.2;
        const inputWidth = this.props.containerWidth - (this.props.lastRowWidth + 10);
        if (inputWidth < inputWidthLimit) return { width: '100%', minWidth: `${this.props.inputMinWidth}px` };
      }
      return { width: `calc(100% - ${this.props.lastRowWidth + 10}px)`, minWidth: `${this.props.inputMinWidth}px` };
    }
    return { minWidth: `${this.props.inputMinWidth}px` };
  }

  get utilDivStyle() {
    return {
      position: 'absolute',
      visibility: 'hidden',
      height: 'auto',
      width: 'auto',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    };
  }

  handleOnPaste(e) {
    if (this.props.onPaste) this.props.onPaste(e);
  }

  handleKeyUp(e) {
    if (e.keyCode === KEYS.ENTER && this.state.activeIndex !== null) {
      const selectedSuggestion = this.props.suggestions[this.state.activeIndex];
      this.props.onSelect({
        value: selectedSuggestion.value,
        name: selectedSuggestion.name,
        optionalObject: selectedSuggestion.optionalObject,
      });
      this.setState({ activeIndex: null });
      return;
    }

    if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
      let selectedValue = this.props.value;
      // by right it should be key in the range of 48 - 90
      if (this.props.delimiters.indexOf(e.keyCode) !== -1 && e.keyCode !== KEYS.ENTER)
        selectedValue = selectedValue.substr(0, selectedValue.length - 1);
      if (selectedValue) {
        this.props.onSelect({ value: selectedValue });
        this.setState({ activeIndex: null });
      }
      return;
    }
    if (this.props.suggestions.length > 0) {
      const lastSuggestionsIndex = this.props.suggestions.length - 1;
      let activeIndex = this.state.activeIndex;
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
      this.setState({ activeIndex });
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === KEYS.BACKSPACE && this.props.value === '') {
      this.props.onRemove && this.props.onRemove(this.props.lastSelectedLabelsIndex);
    }
    if (this.props.delimiters.indexOf(KEYS.TAB) !== -1 && e.keyCode === KEYS.TAB) {
      let selectedValue = this.props.value;
      if (selectedValue) {
        this.props.onSelect({ value: selectedValue });
        this.setState({ activeIndex: null });
      }
    }
  }

  onSuggestionSelect(suggestion) {
    this.props.onSelect(
      { value: suggestion.value, name: suggestion.name, optionalObject: suggestion.optionalObject },
      this.props.focus
    );
    this.setState({ activeIndex: null });
  }

  render() {
    return (
      <Fragment>
        {!this.props.readOnly && (
          <div className="React_autocomplete_label__auto-complete-input-wrapper" style={this.inputWrapperStyle}>
            <input
              ref={this.props.forwardedRef}
              id={this.props.inputId}
              type="text"
              className={`React_autocomplete_label__input-field${!!this.props.error ? ' error' : ''}`}
              value={this.props.value}
              placeholder={this.props.placeholder && this.props.placeholder}
              onChange={e => this.props.onChange(e.target.value)}
              onKeyUp={this.handleKeyUp}
              onKeyDown={this.handleKeyDown}
              onPaste={this.handleOnPaste}
              onBlur={() => this.setState({ activeIndex: null })}
              onFocus={() => (this._focus = true)}
            />
            <div ref={this.utilDivRef} className="React_autocomplete_label__input-field" style={this.utilDivStyle}>
              {this.props.value}
            </div>
          </div>
        )}
        {this.props.suggestions.length > 0 && (
          <ul className="React_autocomplete_label__suggestions">
            {this.props.suggestions.map(
              (suggestion, index) => (
                <li
                  className={`React_autocomplete_label__suggestion-item${index === this.state.activeIndex ? ' active' : ''} `}
                  key={index}
                  onClick={() => this.onSuggestionSelect(suggestion)}
                >
                  {suggestion.avatarUrl && (
                    <div className="React_autocomplete_label__suggestion-avatar-wrapper">
                      <img className="React_autocomplete_label__suggestion-avatar" src={suggestion.avatarUrl} alt={suggestion.value} />
                    </div>
                  )}
                  <div className="React_autocomplete_label__suggestion-name">{suggestion.name}</div>
                  {suggestion.value && <div className="React_autocomplete_label__suggestion-value">{suggestion.value}</div>}
                </li>
              ),
              this
            )}
          </ul>
        )}
      </Fragment>
    );
  }
}

export default React.forwardRef((props, ref) => <AutoCompleteInput forwardedRef={ref} {...props} />);

AutoCompleteInput.propTypes = {
  containerWidth: PropTypes.number,
  delimiters: PropTypes.array,
  error: PropTypes.bool,
  focus: PropTypes.func,
  forwardedRef: PropTypes.any,
  inputId: PropTypes.string,
  inputMinWidth: PropTypes.number,
  lastRowWidth: PropTypes.number,
  lastSelectedLabelsIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, name: PropTypes.string, optionalObject: PropTypes.object })
  ).isRequired,
  value: PropTypes.string.isRequired,
};

AutoCompleteInput.defaultProps = {
  value: '',
  delimiters: [KEYS.ENTER, KEYS.COMMA, KEYS.TAB],
  suggestions: [],
  placeholder: '',
  inputId: 'auto-input-field',
  inputMinWidth: 150,
  containerWidth: 0,
  readOnly: false,
};
