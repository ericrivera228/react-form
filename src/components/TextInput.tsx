// Third party imports
import React, { ChangeEvent } from 'react';

// Local imports
import '../App.css';

interface iTextInputProps{
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
}

export const TextInput = ({ label, value, onValueChange }: iTextInputProps) => {
  
  // Convenience method for automatically setting id. Doing this in a production 
  // setting get you into trouble; in my experience it's better to explicity set id. 
  // But for this little app it works just fine :)
  const id = label.replace(' ', '-').toLowerCase();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };
  
  return(
    <div>
      <label htmlFor={id} className='form-label'>{label}</label>
      <input type='text' value={value} id={id} onChange={onInputChange}></input>
    </div>
  );
};