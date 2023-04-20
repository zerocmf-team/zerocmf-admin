import { authRequest } from '@/utils/request';

/* 获取应用列表 */
export async function list(params = {}) {
  return authRequest('/api/v1/portal/admin/form', {
    method: 'get',
    params,
  });
}

/* 新增表单 */
export async function addForm(data: any) {
  return authRequest('/api/v1/portal/admin/form', {
    method: 'post',
    data,
  });
}

/* 编辑表单 */
export async function editForm(id: number, data: any) {
  return authRequest(`/api/v1/portal/admin/form/${id}`, {
    method: 'post',
    data,
  });
}
