import { authRequest } from '@/utils/request';

/* 列出当前用户的全部工作空间 */
export async function list(params = {}) {
  return authRequest('/api/v1/tenant/admin/site', {
    method: 'get',
    params,
  });
}

/* 添加工作空间应用 */
export async function add(data = {}) {
  return authRequest('/api/v1/tenant/admin/site', {
    method: 'post',
    data,
  });
}

/* 编辑工作空间应用 */
export async function edit(siteId: string, data = {}) {
  return authRequest(`/api/v1/tenant/admin/site/${siteId}`, {
    method: 'post',
    data,
  });
}

/* 删除工作空间应用 */
export async function del(siteId: string) {
  return authRequest(`/api/v1/tenant/admin/site/${siteId}`, {
    method: 'delete',
  });
}
