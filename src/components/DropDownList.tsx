// Third party imports
import React, { ChangeEvent, useState } from 'react';

// Local imports
import '../App.css';

interface iDropDownListProps{
  label: string;
  value: string;
  options: string[];
}

export const DropDownList = ({ label, value, options }: iDropDownListProps) => {

  // @TODO: move to helper file
  // Convenience method for automatically setting id. Doing this in a production 
  // setting get you into trouble; in my experience it's better to explicity set id. 
  // But for this little app it works just fine :)
  const id = label.replace(' ', '-').toLowerCase();

  const onValueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
  
  return(
    <div>
      <label htmlFor={id} className='form-label'>{label}</label>
      <select name="selectList" id={id} value={value} onChange={onValueChange}>
        <option  value=''></option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </div>
    
  );
};