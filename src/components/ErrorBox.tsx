import React from 'react';

interface iErrorBoxProps{
  errorMessage: string
}

/**
 * Component that displays an error message returned from an API
 */
export const ErrorBox = ({ errorMessage }: iErrorBoxProps) => {
  return(
    <div className='error-box'>
      <div>
        Oh no! Looks like something went wrong with the API. One of the calls returned with the error:
      </div>
      <div className='error-message'>
        {errorMessage}
      </div>
    </div>
  );
};