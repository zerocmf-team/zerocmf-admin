import { authRequest } from '@/utils/request';

export async function getPortalCategorys(params: any) {
  return authRequest('/api/v1/portal/admin/category', {
    method: 'GET',
    params,
  });
}

export async function getPortalCategory(id: number, params: any = {}) {
  return authRequest(`/api/v1/portal/admin/category/${id}`, {
    method: 'GET',
    params,
  });
}

export async function getPortalCategoryList(params: any = {}) {
  return authRequest('/api/v1/portal/admin/category/list', {
    method: 'GET',
    params,
  });
}

export async function addPortalCategory(params: any) {
  return authRequest('/api/v1/portal/admin/category', {
    method: 'POST',
    data: params,
  });
}

export async function updatePortalCategory(id: number, params: any) {
  return authRequest(`/api/v1/portal/admin/category/${id}`, {
    method: 'POST',
    data: params,
  });
}

export async function deletePortalCategory(id: number, params: any = {}) {
  return authRequest(`/api/v1/portal/admin/category/${id}`, {
    method: 'DELETE',
    data: params,
  });
}
