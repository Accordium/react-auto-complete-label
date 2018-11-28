# React Auto Complete Label

Usage Example: 
````javascript
import React, { Component } from 'react';
import { AutoCompleteLabel, getLastRowWidth, toSuggestions } from 'react-auto-complete-label';

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
        { emailAddress: 'good.thing@accordium.com', fullName: 'Trevor' },
        { emailAddress: 'sample@accordium.com', fullName: 'The Sampleman' },
      ];
      const suggestions = toSuggestions(listOfSuggestion, { nameKey: 'fullName', valueKey: 'emailAddress' });
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

  onSelect({ value, name }) {
    this.setState(
      prevState => {
        const selectedLabels = prevState.selectedLabels.slice();
        selectedLabels.push({ value, name });
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
        />
      </div>
    );
  }
}

````

-----
**SelectedLabels Component**

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
labelClassNames|string|no||
onRemove|any|no||
removeText|any|no||
selectedLabels|arrayOf|yes||
title|any|no||
-----

**Label Component**

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
error|bool|no|false|
labelClassNames|string|no||
labelIndex|number|no||
onRemove|func|no||
removeText|string|no|&lt;See the source code&gt;|
name|string|no||
value|string|yes||
-----

**AutoCompleteInput Component**

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
containerWidth|number|no|0|
delimiters|array|no|&lt;See the source code&gt;|
error|bool|no||
inputId|string|no|&lt;See the source code&gt;|
inputMinWidth|number|no|150|
lastRowWidth|number|no||
lastSelectedLabelsIndex|number|no||
onChange|func|yes||
onRemove|func|no||
onSelect|func|yes||
placeholder|string|no|&lt;See the source code&gt;|
suggestions|array|no|&lt;See the source code&gt;|
value|string|no|&lt;See the source code&gt;|
-----