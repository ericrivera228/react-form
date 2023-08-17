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
  
  // State varible that indicates if the value for this input is valid
  const [ isValid, setIsValid ] = useState(true);

  // Convert the label to an id
  const id = labelToId(label);

  /**
   * Handler for when the value of this text input changes. If a validation rule was provided, and the 
   * value is not empty, the value is checked against the validation rule. If validation fails, then
   * this text input will be marked red. Validation is not ran for empty values, so the user isn't 
   * annoyed with a bunch of red boxes when the form initially loads.
   * 
   * After validation, the parent handler is called.
   * 
   * @param event Source vent that triggered the onChange.
   */
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {

    // Pull the value out of the event
    const newValue = event.target.value;

    // Run validation rule if necessary
    if(newValue && validationRule && !validationRule(newValue)){
      setIsValid(false);
    } else{
      setIsValid(true);
    }

    // Call parent handler with new value
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