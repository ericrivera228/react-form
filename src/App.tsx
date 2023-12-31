// React imporst
import React, { useEffect, useState } from 'react';

// Component imports
import { ErrorBox } from './components/ErrorBox';
import { TextInput } from './components/TextInput';
import { DropDownList } from './components/DropDownList';

// Hook imports
import { useUniversalApi } from './hooks/useUniversalApi';

// Style imports
import './App.css';

/**
 * Interface representing the values in the form.
 */
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

function App() {

  const [ formValue, setFormValue ] = useState<iFormValue>(emptyForm);
  const [ cityOptions, setCityOptions ] = useState<string[]>([]);

  const { error, getCities, stateOptions, stateOptionsLoading, cityOptionsLoading } = useUniversalApi();

  useEffect(() => {

    if(formValue.state){

      const fetchData = async () => {
        const data = await getCities(formValue.state);
        setCityOptions(data);
      };
  
      fetchData();
    }


  }, [ formValue.state ]);

  /**
   * Handler for when the user clicks the 'submit' button. Prints the form values to
   * the console.
   * 
   * @param event Source event from the submit button
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    // Don't need to do the default form submission since we're handling it manually
    event.preventDefault();

    // Convert the form value to a post string, and log it
    console.log(buildPostString(formValue));
  };

  /**
   * Convenience method for updating the FormValue state object. Applies the
   * new value to FormValue and updates state.
   * 
   * @param fieldName Name of the field to update in the FormValue object.
   * @param value New value of the field.
   */
  const onInputValueChange = (fieldName: string, value: string) => {
    const newFormValue = { ...formValue };
    newFormValue[fieldName as keyof iFormValue] = value;

    setFormValue(newFormValue);
  };

  /**
   * Special handler for when the value of the state field changes. Beacause city 
   * is dependent on state, whenever the state changes the city field needs to be 
   * cleared out as well. Applies the new state value to FormValue, clears out the
   * city, and updates state.
   * 
   * @param newValue New value for the state field of the FormValue variable
   */
  const onStateValueChange = (newValue: string) => {
    setCityOptions([]);
    
    const newFormValue = { ...formValue };
    newFormValue.city = '';
    newFormValue.state = newValue;

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

  /**
   * Method that converts the form value into a string representing a JSON post request.
   */
  const buildPostString = (formValue: iFormValue) => {

    let printString = '{\n';

    // Loop through each of the fields and add it to the print string
    Object.keys(formValue).forEach(key => {
      printString += `\t${key}: ${formValue[key as keyof iFormValue]}\n`;
    });

    printString += '\n}';

    return printString;
  };

  return (
    <div className="App">
      { error && <ErrorBox errorMessage={error} />}
      <div className='instructions'>
        Please enter your information using the form below: 
      </div>
      <form className='form' onSubmit={onSubmit}>
        <div>
          <TextInput label='First Name' value={formValue.firstName} onValueChange={(newValue: string) => onInputValueChange('firstName', newValue)}  />
          <TextInput label='Last Name' value={formValue.lastName} onValueChange={(newValue: string) => onInputValueChange('lastName', newValue)} />
          <DropDownList label='State' value={formValue.state} options={stateOptions} areOptionsLoading={stateOptionsLoading} onValueChange={onStateValueChange} />
          <DropDownList label='City' value={formValue.city} options={cityOptions} areOptionsLoading={cityOptionsLoading} onValueChange={(newValue: string) => onInputValueChange('city', newValue)} />
          <TextInput label='Email' value={formValue.email} onValueChange={(newValue: string) => onInputValueChange('email', newValue)} validationRule={isEmailValid} />
          <TextInput label='Password' value={formValue.password} onValueChange={(newValue: string) => onInputValueChange('password', newValue)}/>
        </div>
        <input type='submit' value='Submit' disabled={!isFormValid()} />
      </form>
    </div>
  );
}

export default App;
