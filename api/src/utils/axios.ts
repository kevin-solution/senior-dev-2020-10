import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { BASE_API_URL } from './const';

const axiosDefaultConfig = {
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
}

export interface IHttpClientRequestParameters<T> {
  url: string
  payload?: T
}

export interface IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
  post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
}

export class HttpClient implements IHttpClient {
  axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      ...axiosDefaultConfig,
      ...config
    });
  }

  get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {}
      }

      // finally execute the GET request with axios:
      this.axiosInstance
          .get(url, options)
          .then((response: any) => {
            resolve(response.data as T)
          })
          .catch((response: any) => {
            reject(response)
          })

    })
  }

  post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload } = parameters

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {}
      }

      // finally execute the POST request with axios:
      this.axiosInstance
          .post(url, payload, options)
          .then((response: any) => {
            resolve(response.data as T)
          })
          .catch((response: any) => {
            reject(response)
          })
    })
  }
}

export const httpClient = new HttpClient({
  baseURL: BASE_API_URL
})
