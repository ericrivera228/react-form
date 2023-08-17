// Third party imports
import React, { ChangeEvent } from 'react';

// Local imports
import '../App.css';
import { labelToId } from '../helpers';

/**
 * Interface representing the props object that is passed into the DropDownList component.
 */
interface iDropDownListProps{
  label: string;
  value: string;
  options: string[];
  areOptionsLoading: boolean;
  onValueChange: (newValue: string) => void;
}

export const DropDownList = ({ label, value, options, areOptionsLoading, onValueChange }: iDropDownListProps) => {

  // Convert the label to an id
  const id = labelToId(label);

  /**
   * Handler for when the value of the select changes. Just pulls the value out of the event and then
   * calls the parent handler.
   * 
   * @param event Source vent that triggered the onChange.
   */
  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onValueChange(event.target.value);
  };
  
  return(
    <div className='drop-down-list'>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>

      <div>
        <select name="selectList" id={id} value={value} onChange={onSelectChange} disabled={options.length === 0}>

          {areOptionsLoading && (
            <option  value=''>Loading...</option>  
          )}

          {!areOptionsLoading && (
            <React.Fragment>
              <option  value=''></option>
              {options.map((option) => <option value={option} key={option}>{option}</option>)}
            </React.Fragment>
          )}

        </select>
      </div>
    
    </div>
    
  );
};