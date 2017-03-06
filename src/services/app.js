import {request} from '../utils';

export function login(account, password, captcha) {

  const client_id = guid();
  debugger;
  return request(`api/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
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
