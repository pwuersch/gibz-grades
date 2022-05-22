import { config } from '@/utils/config';
import { Axios, Method } from 'axios';
import { useNotification } from 'naive-ui';
import { BaseResponse } from '@/utils/types';
import { useAuth0 } from '@auth0/auth0-vue';

const axiosInstance = new Axios({
  baseURL: config.apiUrl,
  timeout: 10 * 1000,
  transitional: {
    silentJSONParsing: true,
  },
});

export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const notification = useNotification();

  const callApi = async <T>(path: string, method: Method, data?: unknown) => {
    if (!isAuthenticated.value) {
      notification.warning({
        title: 'Warning',
        content: 'Please log in first',
        duration: 5 * 1000,
      });
      throw new Error('Not authenticated');
    }

    const accessToken = await getAccessTokenSilently();

    try {
      return await axiosInstance.request<T>({
        url: path,
        method,
        data,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        validateStatus: (status) => status < 300,
        transformRequest: (request) =>
          typeof request === 'string' ? request : JSON.stringify(request),
        transformResponse: (data) => JSON.parse(data),
      });
    } catch (err) {
      const { response } = err as any;
      notification.error({
        title: 'API Error',
        content: JSON.parse(response?.data)?.message,
        description: response?.code,
        duration: 4 * 1000,
      });
      throw err;
    }
  };

  const get = async <T = BaseResponse>(path: string) => {
    return callApi<T>(path, 'GET');
  };

  const post = async <T = BaseResponse>(path: string, data: unknown) => {
    return callApi<T>(path, 'POST', data);
  };

  return {
    callApi,
    get,
    post,
  };
};
