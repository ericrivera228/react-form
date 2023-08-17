import { useEffect, useRef, useState } from 'react';

const API_TOKEN = 'M-QfduLo5NJMNO6c-4KoniosLmyJ-GXTKGnNHMlZBd1l9YAthvfzICCzaAQ_iwFnmss';
const USER_EMAIL = 'ericrivera228@gmail.com';

export const useUniversalApi = () => {

  // State variable for holding the message for an error that occured with an API call
  const [ error, setError ] = useState<string>();

  // Access token needed to make the state and country calls
  const [ accessToken, setAccessToken ] = useState<string>();

  const [ stateOptions, setStateOptions ] = useState<string[]>([]);

  const initialized = useRef(false);

  // Fetch the access token on the initial load
  useEffect(() => {
    if (!initialized.current) {

      console.log('Getting access token');

      initialized.current = true;
      getAccessToken().then(
        (jsonTokenResponse) => {
          setAccessToken((jsonTokenResponse as any).auth_token);
        },
        (error: Error) => handleApiError(error.message)
      );
    }
  }, []);

  // Fetch the states when the access token is available
  useEffect(() => {
    if(accessToken){
      getUsaStates().then(
        (jsonStatesResponse) => {
          setStateOptions(jsonStatesResponse.map((x: any) => x.state_name));
        },
        (error: Error) => handleApiError(error.message)
      );
    }
  }, [ accessToken ]);

  /**
   * Utility method for delaying with an error message from an API. Sets the 'error' state variable.
   * 
   * @param errorMessage Error message received from the API
   */
  const handleApiError = (errorMessage: string) => {
    setError(errorMessage);
  };

  /**
   * Gets the access token from the universal API
   * 
   * @returns A promise with the API response containing the access token, or an error.
   */
  const getAccessToken = (): Promise<any> => {
    return fetch('https://www.universal-tutorial.com/api/getaccesstoken', buildRequest()).then((res) => handleResponse(res));
  };

  /**
   * Gets the access token from the universal API
   * 
   * @returns A promise with the API response containing the list of states, or an error.
   */
  const getUsaStates = (): Promise<any> => {
    return fetch('https://www.universal-tutorial.com/api/states/United States', buildRequest(accessToken)).then((res) => handleResponse(res));
  };

  const getCities = (state: string): Promise<string[]> => {

    console.log('Fetching cities for: ' + state);

    return fetch(`https://www.universal-tutorial.com/api/cities/${state}`, buildRequest(accessToken)).then((res) => handleResponse(res)).then(
      (jsonCitiesResponse) => {
        return jsonCitiesResponse.map((x: any) => x.city_name);
      },
      (error: Error) => {
        handleApiError(error.message);
        return [];
      }
    );
  };

  /**
   * Utility method for building a RequestInit object.
   * 
   * @param accessToken If provided, will build a request with authorization headers. If not provided,it must be a request for the access token, 
   *  so the RequestInit will be built specifically for that call.
   * @returns A RequestInit that can be used for a get call
   */
  const buildRequest = (accessToken?: string): RequestInit => {

    let headers; 

    // If an access token was provided, create headers for an authorized request.
    // Otherwise, it must be a request for the access token, so create headers for
    // that request
    if(accessToken){
      headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      };
    } else {
      headers = {
        Accept: 'application/json',
        'api-token': API_TOKEN,
        'user-email': USER_EMAIL,
        Authorization: accessToken ? `Bearer ${accessToken}` : ''
      };
    }

    return {
      method: 'GET',
      headers: headers
    };
  };

  return {
    error,
    getCities,
    stateOptions
  };

};

/**
 * Utility function for handling a response from a fetch call.
 */
async function handleResponse(response: Response) {
  if (!response.ok) {
    const responseJson = await response.json();

    let errorMessage = '';

    // Depending on the originating call, the error message could be in different places
    if(responseJson.error.message){
      errorMessage = responseJson.error.message;
    } else{
      errorMessage = responseJson.error;
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}