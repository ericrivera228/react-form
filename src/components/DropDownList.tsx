// Third party imports
import React, { ChangeEvent } from 'react';

// Local imports
import '../App.css';
import { labelToId } from '../helpers';

interface iDropDownListProps{
  label: string;
  value: string;
  options: string[];
  onValueChange: (newValue: string) => void;
}

export const DropDownList = ({ label, value, options, onValueChange }: iDropDownListProps) => {

  const id = labelToId(label);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };
  
  return(
    <div>
      <label htmlFor={id} className='form-label'>{label}</label>
      <select name="selectList" id={id} value={value} onChange={onSelectChange} disabled={options.length === 0}>
        <option  value=''></option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </div>
    
  );
};