import React, { Component } from 'react';
import AutoCompleteLabel from './lib/components/AutoCompleteLabel';
import './lib/style/style.scss';
import { getLastRowWidth, toSuggestions } from './lib';

export default class SimpleApp extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selectedLabels: [{ value: 'smile@accordium.com', name: 'Hello Accordium', error: true }],
      suggestions: [],
      containerWidth: 0,
      lastRowWidth: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.container = React.createRef();
  }

  componentDidMount() {
    if (this.lastRowWidth) {
      const listOfSuggestion = [
        { emailAddress: 'good.thing@accordium.com', firstName: 'Trevor', lastName: 'Noah', optionalObject: { firstName: 'Trevor', lastName: 'Noah' } },
        { emailAddress: 'sample@accordium.com', firstName: 'Samnple', lastName: 'Man' },
      ];
      const suggestions = toSuggestions(listOfSuggestion, { nameKey: 'firstName', nameKey2: 'lastName', valueKey: 'emailAddress' });
      setTimeout(this.setState({ suggestions, lastRowWidth: this.lastRowWidth, containerWidth: this.containerWidth }), 100);
    }
  }

  get lastRowWidth() {
    const elem = this.container.current;
    if (!elem) return 0;
    const lastRowWidth = getLastRowWidth(elem);
    return lastRowWidth;
  }

  get containerWidth() {
    const elem = this.container.current;
    if (!elem) return 0;
    return elem.clientWidth;
  }

  onChange(value) {
    this.setState({ value });
  }

  onRemove(arrayIndex) {
    this.setState(
      prevState => {
        const selectedLabels = prevState.selectedLabels.slice();
        selectedLabels.splice(arrayIndex, 1);
        return { selectedLabels };
      },
      () => this.setState({ lastRowWidth: this.lastRowWidth, containerWidth: this.containerWidth })
    );
  }

  onSelect({ value, name, optionalObject }) {
    this.setState(
      prevState => {
        const selectedLabels = prevState.selectedLabels.slice();
        selectedLabels.push({ value, name, optionalObject });
        return { selectedLabels, suggestions: [], value: '' };
      },
      () => this.setState({ lastRowWidth: this.lastRowWidth, containerWidth: this.containerWidth })
    );
  }

  render() {
    return (
      <div style={{ width: '30%', overflow: 'hidden', border: '2px solid' }}>
        <AutoCompleteLabel
          ref={this.container}
          keyText="To"
          inputValue={this.state.value}
          onInputChange={this.onChange}
          onSelect={this.onSelect}
          onRemove={this.onRemove}
          selectedLabels={this.state.selectedLabels}
          suggestions={this.state.suggestions}
          containerWidth={this.state.containerWidth}
          lastRowWidth={this.state.lastRowWidth}
          readOnly
        />
      </div>
    );
  }
}
