import React, { Component } from 'react';
import LabelContainer from './lib/components/LabelContainer';
import SelectedLabels from './lib/components/SelectedLabels';
import AutoCompleteInput from './lib/components/AutoCompleteInput';
import './lib/style/style.scss';
import { getLastRowWidth } from './lib';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selectedLabels: [{ value: 'yoyoyoyo', title: 'wow wow', error: true }],
      suggestions: [{ value: 'mvi@accordium.com', name: 'test caption' }, { value: 'virandry@gmail.com', name: 'Virandry' }],
      lastRowWidth: 0,
      containerWidth: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.container = React.createRef();
  }
  componentDidMount() {
    if (this.lastRowWidth) {
      setTimeout(this.setState({ lastRowWidth: this.lastRowWidth, containerWidth: this.containerWidth }), 100);
    }
  }

  get lastSelectedLabelsIndex() {
    return this.state.selectedLabels.length - 1;
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

  onSelect({ value, title }) {
    this.setState(
      prevState => {
        const selectedLabels = prevState.selectedLabels.slice();
        selectedLabels.push({ value, title });
        return { selectedLabels, suggestions: [], value: '' };
      },
      () => this.setState({ lastRowWidth: this.lastRowWidth, containerWidth: this.containerWidth })
    );
  }

  render() {
    return (
      <div style={{ width: '30%', overflow: 'hidden', border: '2px solid' }}>
        <LabelContainer>
          <label className="label" htmlFor="auto-input-field">
            To
          </label>
          <div className="label-input-wrapper" ref={this.container}>
            <SelectedLabels selectedLabels={this.state.selectedLabels} onRemove={this.onRemove} labelClassNames="grey-200" />
            <AutoCompleteInput
              onChange={this.onChange}
              onSelect={this.onSelect}
              onRemove={this.onRemove}
              lastSelectedLabelsIndex={this.lastSelectedLabelsIndex}
              value={this.state.value}
              suggestions={this.state.suggestions}
              containerWidth={this.state.containerWidth}
              lastRowWidth={this.state.lastRowWidth}
            />
          </div>
        </LabelContainer>
      </div>
    );
  }
}
