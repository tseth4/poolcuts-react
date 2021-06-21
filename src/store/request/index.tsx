import axios from "axios";
export const client = axios.create({
  // baseURL: "http://ec2-3-80-112-126.compute-1.amazonaws.com:8080/"
  baseURL: ""
});

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