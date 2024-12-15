import loginMapper from '../mappers/login.mapper';
import { IUserLogin } from '../models/user-login.model';
import { urls } from '../resources/url.resource';
import http from './general/http.service';

const headers: HeadersInit = {
  'Content-Type': 'application/json'
};

export const AuthServiceLogin = async (credentials: IUserLogin): Promise<number | undefined> => {
  const url = urls.login;
  const body = loginMapper.toApi(credentials);

  return http.post(url, headers, body)
    .then(async (response) => {

      if (response.status === 200) {
        const responseBody = await response.json();
        if (responseBody.token) {
          const token = responseBody.token;
          const responseHandlers: { [key: string]: () => void } = {
            READER: () => window.location.replace(urls.home + '?token=' + token),
            SUPPLIER: () => window.location.replace(urls.loan + '?token=' + token),
            ASSISTANT: () => window.location.replace(urls.provider + '?token=' + token),
            ADMIN: () => window.location.replace(urls.admin + '?token=' + token),
          };

          const handleResponse = responseHandlers[responseBody.role];
          handleResponse();
          return;
        }
      }
      return response.status;
    });
};

