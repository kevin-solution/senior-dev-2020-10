import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { BASE_API_URL } from './const';

const axiosDefaultConfig = {
  timeout: 5000,
};

export interface IHttpClientRequestParameters<T> {
  url: string;
  payload?: T;
}

export interface IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>;
  post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>;
}

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = applyCaseMiddleware(
      axios.create({
        ...axiosDefaultConfig,
        ...config,
      })
    );
  }

  public get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      };

      // finally execute the GET request with axios:
      this.axiosInstance
        .get(url, options)
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((response: AxiosError<T>) => {
          reject(response);
        });
    });
  }

  public post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      };

      // finally execute the POST request with axios:
      this.axiosInstance
        .post(url, payload, options)
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((response: AxiosError<T>) => {
          reject(response);
        });
    });
  }
}

export const httpClient = new HttpClient({
  baseURL: BASE_API_URL,
});
