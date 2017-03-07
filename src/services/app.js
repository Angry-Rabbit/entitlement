import {request, UUID} from '../utils';
import Cookie from 'js-cookie';


export function login(account, password, captcha) {
  const clientId = Cookie.get('clientID');
  return request(`api/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      client_id: clientId,
      mobile: account,
      password,
      captcha,
      role_id: 'R001',
    })
  })
}

export function logout() {
  /*TODO*/
}

export function getUserInfo() {
  return request('/api/users');
  /*TODO*/
}

export function refreshAccessToken() {
  /*TODO*/
}
