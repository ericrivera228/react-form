// Third party imports
import React from 'react';

// Local imports
import '../App.css';

interface iTextInputProps{
  label: string;
}

export const TextInput = ({ label }: iTextInputProps) => {
  
  // Convenience method for automatically setting id. Doing this in a production 
  // setting get you into trouble; in my experience it's better to explicity set id. 
  // But for this little app it works just fine :)
  const id = label.replace(' ', '-').toLowerCase();
  
  return(
    <div>
      <label htmlFor={id} className='form-label'>{label}</label>
      <input type='text' id={id}></input>
    </div>
  );
};