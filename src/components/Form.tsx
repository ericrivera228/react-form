import React, { useEffect, useState } from 'react';
import { TextInput } from './TextInput';
import { DropDownList } from './DropDownList';

export interface iFormProps{
  stateOptions: string[];
  handleSubmit: (formValue: iFormValue) => void;
  getCities: (state: string) => Promise<string[]>;
}

export interface iFormValue{
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

export const Form = ({ handleSubmit, stateOptions, getCities }: iFormProps) => {

  const [ formValue, setFormValue ] = useState<iFormValue>(emptyForm);
  const [ cityOptions, setCityOptions ] = useState<string[]>([]);

  useEffect(() => {

    if(formValue.state){

      const fetchData = async () => {
        const data = await getCities(formValue.state);
        setCityOptions(data);
      };
  
      fetchData();
    }


  }, [ formValue.state ]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    // Don't need to do the default form submission since we're handling it manually
    event.preventDefault();

    handleSubmit(formValue);
  };

  const onInputValueChange = (fieldName: string, value: string) => {
    const newFormValue = { ...formValue };
    newFormValue[fieldName as keyof iFormValue] = value;

    setFormValue(newFormValue);
  };

  /**
   * Method that determines if the form is valid or not. The form is valid when
   * all inputs are not empty, and email passes it's special validation.
   * 
   * @returns True if the whole form is valid, false if otherwise.
   */
  const isFormValid = () => {

    let allFieldsHaveValue = true;

    Object.keys(formValue).forEach(key => {
      if(!formValue[key as keyof iFormValue]){
        allFieldsHaveValue = false;
      }
    });

    // Form is valid if all the fields have a value, and email passes it's special validation
    return allFieldsHaveValue && isEmailValid(formValue.email);

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

  const onStateValueChange = (newValue: string) => {
    setCityOptions([]);
    
    const newFormValue = { ...formValue };
    newFormValue.city = '';
    newFormValue.state = newValue;

    setFormValue(newFormValue);
  };

  return(
    <form className='form' onSubmit={onSubmit}>
      <div>
        <TextInput label='First Name' value={formValue.firstName} onValueChange={(newValue: string) => onInputValueChange('firstName', newValue)}  />
        <TextInput label='Last Name' value={formValue.lastName} onValueChange={(newValue: string) => onInputValueChange('lastName', newValue)} />
        <DropDownList label='State' value={formValue.state} options={stateOptions} onValueChange={onStateValueChange} />
        <DropDownList label='City' value={formValue.city} options={cityOptions} onValueChange={(newValue: string) => onInputValueChange('city', newValue)} />
        <TextInput label='Email' value={formValue.email} onValueChange={(newValue: string) => onInputValueChange('email', newValue)} validationRule={isEmailValid} />
        <TextInput label='Password' value={formValue.password} onValueChange={(newValue: string) => onInputValueChange('password', newValue)}/>
      </div>
      <input type='submit' value='Submit' disabled={!isFormValid()} />
    </form>
  );
};