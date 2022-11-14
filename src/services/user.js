import { request, authRequest } from '@/utils/request';

export async function login(params) {
  return request('/api/oauth/token', {
    method: 'POST',
    data: params,
  });
}

export async function currentUser() {
  return authRequest('/api/v1/user/current_user');
}

export async function getDatas(params) {
  return authRequest('/api/v1/user/admin/account', {
    method: 'GET',
    params,
  });
}

export async function getData(id, params) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'GET',
    params,
  });
}

export async function addData(params) {
  return authRequest('/api/v1/user/admin/account', {
    method: 'POST',
    data: params,
  });
}

export async function editData(id, params) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'POST',
    data: params,
  });
}

export async function editAccount(id, params) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'POST',
    data: params,
  });
}
