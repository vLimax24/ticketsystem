import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };

  return (
<select
  value={selectedValue}
  onChange={handleSelectChange}
  className="p-2 rounded-md"
>
  {options.map((option) => (
    <option key={option} value={option} className="py-2">
      {option}
    </option>
  ))}
</select>
  );
};

export default Dropdown;