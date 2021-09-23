import axios, {AxiosRequestConfig} from 'axios';

export const apiUrl = 'https://www.googleapis.com/books/v1';

const queryInstance = axios.create({
  baseURL: apiUrl
});

queryInstance.interceptors.response.use(
  (response) => response.data
);


export const queryGet = function (url: string, config: AxiosRequestConfig = {}): Promise<any> {
  return queryInstance.get(url, config);
};
