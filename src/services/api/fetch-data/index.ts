import { withCallback } from "../../with-callback";
import { withPromise } from "../../with-promise";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function fetchData(url: string): Promise<ResponseOutput> {
  let response: AxiosResponse;
  const defaultResponse: AxiosResponse = {
    data: "Axios Error",
    status: 404,
    statusText: "Data not avaialable",
    headers: {},
    config: {},
    request: {},
  };
  const errorResponse: AxiosResponse = {
    ...defaultResponse,
    status: 500,
    statusText: "Internal Server Error",
    data: "Failed to fetch data",
  };
  try {
    response = await axios(url);
  } catch (e) {
    if (e instanceof AxiosError) response = e.response || errorResponse;
    else response = errorResponse;
  }
  const status = response.status;
  const output: ResponseOutput = {
    status,
    statusText: response.statusText,
    data: response.data,
  };
  return output;
}

const fetchDataUsingCallback: (
  url: string,
  successCallback: any,
  errorCallback: any
) => Promise<void> = (url: string, successCallback: any, errorCallback: any) =>
  withCallback(() => fetchData(url), successCallback, errorCallback);
const fetchDataUsingPromise: (url: string) => Promise<ResponseOutput> = (
  url: string
) => withPromise(() => fetchData(url));

export { fetchDataUsingCallback, fetchDataUsingPromise };
