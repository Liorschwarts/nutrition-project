// Reusable UI form components
import React from "react";

export const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Button = ({
  type = "button",
  onClick,
  variant = "primary",
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </div>
  );
};

export const ResultDisplay = ({ label, value, unit, className = "" }) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow ${className}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-blue-600">
        {value}
        {unit}
      </p>
    </div>
  );
};
