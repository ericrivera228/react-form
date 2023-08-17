import React, { useState } from 'react';
import './App.css';

import { TextInput } from './components/TextInput';

interface iFormValue{
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  email: string;
  password: string;
}

const emptyForm: iFormValue = {
  firstName: '',
  lastName: '',
  state: '',
  city: '',
  email: '',
  password: ''
};

function App() {

  const [ formValue, setFormValue ] = useState<iFormValue>(emptyForm);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    // Don't need to do the default form submission since we're handling it manually
    event.preventDefault();

    console.log(buildPostString());
  };

  const onInputValueChange = (fieldName: string, value: string) => {
    const newFormValue = { ...formValue };
    newFormValue[fieldName as keyof iFormValue] = value;

    setFormValue(newFormValue);
  };

  /**
   * Method that converts the form value into a string representing a JSON post request.
   */
  const buildPostString = () => {

    let printString = '{\n';

    // Loop through each of the fields and add it to the print string
    Object.keys(formValue).forEach(key => {
      printString += `\t${key}: ${formValue[key as keyof iFormValue]}\n`;
    });

    printString += '\n}';

    console.log(printString);
  };

  const isFormValid = () => {
    Object.keys(formValue).forEach(key => {
      if(!formValue[key as keyof iFormValue]){
        return false;
      }
    });

    // If the code made it down here, then all inputs have a value
    // Email has it's own addition rule, so at this point the validity
    // of the wile form rests on the email field.
    return isEmailValid(formValue.email);

  };

  /**
   * Validation method for email field. An email is said to be valid if it contains
   * both a '@' and '.' character.
   * 
   * @param value Value to check
   * @returns True if the given value is a valid email, false if otherwise.
   */
  const isEmailValid = (value: string): boolean => {
    return value.includes('@') && value.includes('.');
  };

  return (
    <div className="App">
      <form className='form' onSubmit={onSubmit}>
        <div className='form-header'>
          Please enter your information using the form below: 
        </div>
        <div className='form-body'>
          <TextInput label='First Name' value={formValue.firstName} onValueChange={(newValue: string) => onInputValueChange('firstName', newValue)}  />
          <TextInput label='Last Name' value={formValue.lastName} onValueChange={(newValue: string) => onInputValueChange('lastName', newValue)} />
          <TextInput label='State' value={formValue.state} onValueChange={(newValue: string) => onInputValueChange('state', newValue)} />
          <TextInput label='City' value={formValue.city} onValueChange={(newValue: string) => onInputValueChange('city', newValue)} />
          <TextInput label='Email' value={formValue.email} onValueChange={(newValue: string) => onInputValueChange('email', newValue)} validationRule={isEmailValid} />
          <TextInput label='Password' value={formValue.password} onValueChange={(newValue: string) => onInputValueChange('password', newValue)}/>
        </div>
        <input type='submit' value='Submit' disabled={!isFormValid()} />
      </form>
    </div>
  );
}

export default App;
