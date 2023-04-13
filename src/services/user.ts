import { request, authRequest } from '@/utils/request';

export async function login(params: any) {
  return request('/api/oauth/token', {
    method: 'POST',
    data: params,
  });
}

export async function loginOut(id: number) {
  return authRequest(`/api/v1/user/admin/account/logout/${id}`, {
    method: 'GET',
  });
}

export async function currentUser() {
  return authRequest('/api/v1/user/admin/account/current_user');
}

export async function getDatas(params: any) {
  return authRequest('/api/v1/user/admin/account', {
    method: 'GET',
    params,
  });
}

export async function getData(id: number, params: any = {}) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'GET',
    params,
  });
}

export async function addData(data: any) {
  return authRequest('/api/v1/user/admin/account', {
    method: 'POST',
    data,
  });
}

export async function editData(id: any, data: any) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'POST',
    data,
  });
}

export async function editAccount(id: any, data: any = {}) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'POST',
    data,
  });
}

export async function deleteAccount(id: any, data: any = {}) {
  return authRequest(`/api/v1/user/admin/account/${id}`, {
    method: 'DELETE',
    data,
  });
}
