import { useEffect, useState } from 'react';

const API_TOKEN = 'M-QfduLo5NJMNO6c-4KoniosLmyJ-GXTKGnNHMlZBd1l9YAthvfzICCzaAQ_iwFnmss';
const USER_EMAIL = 'ericrivera228@gmail.com';

export const useUniversalApi = () => {

  const [ error, setError ] = useState<string>();
  const [ accessToken, setAccessToken ] = useState<string>();

  useEffect(() => {
    getAccessToken().then(
      (jsonRes) => {
        setAccessToken((jsonRes as any).auth_token);
      },
      (error: Error) => handleApiError(error.message)
    );
  }, []);

  const handleApiError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const getAccessToken = () => {
  
    const url = 'https://www.universal-tutorial.com/api/getaccesstoken';

    return fetch(`${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'api-token': API_TOKEN,
        'user-email': USER_EMAIL
      }
    }).then((res) => handleResponse(res));
  
  };

  return {
    error
  };


};

/**
 * Utility function for handling a response from a fetch call.
 */
async function handleResponse(response: Response) {
  if (!response.ok) {
    const responseJson = await response.json();
    throw new Error(responseJson.error);
  }

  return await response.json();
}