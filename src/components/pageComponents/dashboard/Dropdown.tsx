import React, { useState, useEffect } from 'react';

interface DropdownProps {
  options: string[];
  onChange: (selectedValue: string) => void;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value); // Update selectedValue when the value prop changes
  }, [value]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleSelectChange}
      className="p-2 rounded-md bg-none border-2 bg-card"
    >
      {options.map((option) => (
        <option key={option} value={option} className="py-2 bg-card font-sans">
          {`${option.charAt(0).toUpperCase()}${option.slice(1).toLowerCase()}`}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
