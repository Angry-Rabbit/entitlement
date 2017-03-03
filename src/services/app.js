import request from '../utils/request';

export function login(account, password, captcha) {
  return request(`api/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      client_id: '13620027800136200278001362002780013',
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
