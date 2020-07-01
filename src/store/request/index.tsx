import axios from "axios";
export const client = axios.create({
  baseURL: ""
});

// client.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

const request = (options: any) => {

  const onSuccess = (response: any) => {
    return response.data; 
  };

  const onError = (error: any) => {
    if (error.response) {
    } else {
    }
    return Promise.reject(error.response || error.message);
  };
  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;