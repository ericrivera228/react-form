// Third party imports
import React, { ChangeEvent, useState } from 'react';

// Local imports
import '../App.css';
import { labelToId } from '../helpers';

interface iTextInputProps{
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;

  // If this method is provided, TextInput component will check new values with this method. 
  // Needs to return true if a method is valid, false if not.
  validationRule?: (value: string ) => boolean;
}

export const TextInput = ({ label, value, onValueChange, validationRule }: iTextInputProps) => {
  
  const [ isValid, setIsValid ] = useState(true);

  const id = labelToId(label);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {

    const newValue = event.target.value;

    // If the user has entered some information, and a validation method was passed, 
    // check to see if the new value is valid. (If input is blank, don't do validation check)
    if(newValue && validationRule && !validationRule(newValue)){
      setIsValid(false);
    } else{
      setIsValid(true);
    }

    onValueChange(newValue);
  };
  
  return(
    <div className='text-input'>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <div>
        <input type='text' value={value} id={id} onChange={onInputChange} className={!isValid ? 'invalid' : ''}></input>
      </div>
    </div>
  );
};