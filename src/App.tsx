// React imporst
import React, { useState } from 'react';

// Component imports
import { ErrorBox } from './components/ErrorBox';
import { Form, iFormValue } from './components/Form';

// Hook imports
import { useUniversalApi } from './hooks/useUniversalApi';

// Style imports
import './App.css';

function App() {

  const { error, getCities, stateOptions } = useUniversalApi();

  const handleFormSubmit = (formValue: iFormValue) => {
    console.log(buildPostString(formValue));
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
      <Form stateOptions={stateOptions} handleSubmit={handleFormSubmit} getCities={getCities}/>
    </div>
  );
}

export default App;
