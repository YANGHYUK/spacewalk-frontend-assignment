import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const serverURL = process.env.EXPO_PUBLIC_API_URL;

export interface IapiForm extends AxiosRequestConfig {
  id?: number | string;
  callback?: (data: any) => void;
}
export type TapiRes = AxiosResponse;
export type TapiError = AxiosError | Error;

interface IaxiosInstance extends AxiosInstance {
  (config: IapiForm): Promise<TapiRes>;
}

export const axiosInstance: IaxiosInstance = axios.create({
  baseURL: serverURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const accessToken = "";

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => err
);

export const fetcher = async (config: IapiForm) => {
  const { method, url, params, data, headers } = config;
  // console.log('fetcher ===> config:', config);
  // 통신
  if (url) {
    try {
      const res: AxiosResponse = await axiosInstance({
        method,
        url,
        params,
        data,
        headers,
      });
      // console.log('fetcher ===> res:', res);
      return res.data;
    } catch (e) {
      // console.log('fetcher ===> e:', e);

      throw e;
    }
  }
};

const requests = {};

export default requests;
