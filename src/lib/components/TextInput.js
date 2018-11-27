import React from 'react';

const TextInput = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  helpText
}) => (
  <div className="form-group">
    {label && <label className="text-label">{label}</label>}
    <input
      type={type}
      className="text-input"
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder}
    />
    {helpText && <small className="simple-form-text">{helpText}</small>}
  </div>
);

export default TextInput;
