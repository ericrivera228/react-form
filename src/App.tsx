import React from 'react';
import './App.css';

import { TextInput } from './components/TextInput';

function App() {

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    // Don't need to do the default form submission since we're handling it manually
    event.preventDefault();

    console.log('Hey, listen!');
  };

  return (
    <div className="App">
      <form className='form' onSubmit={onSubmit}>
        <div className='form-header'>
          Please enter your information using the form below: 
        </div>
        <div className='form-body'>
          <TextInput label='First Name' />
          <TextInput label='Last Name' />
          <TextInput label='State' />
          <TextInput label='City' />
          <TextInput label='Email' />
          <TextInput label='Password' />
        </div>
        <input type='submit' value='submit' />
      </form>
    </div>
  );
}

export default App;
