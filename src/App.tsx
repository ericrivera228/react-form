// React imporst
import React, { useState } from 'react';

// Component imports
import { ErrorBox } from './components/ErrorBox';
import { Form } from './components/Form';

// Hook imports
import { useUniversalApi } from './hooks/useUniversalApi';

// Style imports
import './App.css';

function App() {

  const { error } = useUniversalApi();

  return (
    <div className="App">
      { error && <ErrorBox errorMessage={error} />}
      <Form />
    </div>
  );
}

export default App;
