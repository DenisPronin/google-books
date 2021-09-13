import axios from 'axios';

export const apiUrl = 'https://www.googleapis.com/books/v1';

const queryInstance = axios.create({
  baseURL: apiUrl
});

queryInstance.interceptors.response.use(
  (response) => response.data
);


export const queryGet = function (url, config = {}) {
  return queryInstance.get(url, config);
};
