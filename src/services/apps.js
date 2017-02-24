/**
 *
 * Created by angryrabbit on 2/20/17.
 */
import request from '../utils/request';

export function fetch(appID) {
  return request(`api/apps/${appID}`, {
    method: 'GET',
    headers: {
      Authentication: '',
    }
  });
}

export function list({page}) {
  return request(`api/apps?page=${page}&limit=5`, {
    method: 'GET',
    headers: {
      Authentication: 'xxx',
    },
  });
}

export function create(app) {
  return request(`api/apps`, {
    method: 'POST',
    body: app,
    headers: {
      Authentication: '',
    }
  });
}


export function patch(appID, values) {
  return request(`api/apps/${appID}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      Authentication: '',
    }
  });
}

export function remove(appID) {
  return request(`api/apps/${appID}`, {
    method: 'DELETE',
    headers: {
      Authentication: '',
    }
  });
}
