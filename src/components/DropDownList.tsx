// Third party imports
import React, { ChangeEvent } from 'react';

// Local imports
import '../App.css';
import { labelToId } from '../helpers';

interface iDropDownListProps{
  label: string;
  value: string;
  options: string[];
  isLoading: boolean;
  onValueChange: (newValue: string) => void;
}

export const DropDownList = ({ label, value, options, onValueChange, isLoading }: iDropDownListProps) => {

  const id = labelToId(label);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };
  
  return(
    <div className='drop-down-list'>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>

      <div>
        <select name="selectList" id={id} value={value} onChange={onSelectChange} disabled={options.length === 0}>

          {isLoading && (
            <option  value=''>Loading...</option>  
          )}

          {!isLoading && (
            <React.Fragment>
              <option  value=''></option>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </React.Fragment>
          )}

        </select>
      </div>
    
    </div>
    
  );
};