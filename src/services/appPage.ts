import { authRequest } from '@/utils/request';

/* 获取页面列表 */
export async function listPage(appId: number, params = {}) {
  return authRequest(`/api/v1/portal/admin/app_page/all/${appId}`, {
    method: 'get',
    params,
  });
}

/* 新增页面 */
export async function addPage(appId: number, data: any) {
  return authRequest('/api/v1/portal/admin/app_page', {
    method: 'post',
    data: {
      ...data,
      appId,
    },
  });
}

/* 编辑页面 */
export async function editPage(id: number, data: any) {
  return authRequest(`/api/v1/portal/admin/app_page/${id}`, {
    method: 'post',
    data,
  });
}
