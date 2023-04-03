import { authRequest } from '@/utils/request';
/* 获取页面列表 */
export async function addNav(data = {}) {
  return authRequest('/api/v1/portal/admin/nav', {
    method: 'post',
    data,
  });
}

export async function editNav(id: number, data = {}) {
  return authRequest(`/api/v1/portal/admin/nav/${id}`, {
    method: 'post',
    data,
  });
}

/* 获取页面列表 */
export async function listNav(params = {}) {
  return authRequest('/api/v1/portal/admin/nav', {
    method: 'get',
    params,
  });
}

/* 删除导航 */
export async function delNav(id: number) {
  return authRequest(`/api/v1/portal/admin/nav/${id}`, {
    method: 'delete',
  });
}
