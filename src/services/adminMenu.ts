import { authRequest } from '@/utils/request';

/*
 *@Author: frank
 *@Date: 2022-11-17 16:16:41
 *@Description: 当前当前用户所授权的路由
 */
export async function getAdminMenu(params = {}) {
  return authRequest('/api/v1/admin/admin_menu', {
    method: 'get',
    params,
  });
}

/*
 *@Author: frank
 *@Date: 2022-11-17 16:17:03
 *@Description: 获取配置的全部路由
 */

export async function getAllAdminMenu(params = []) {
  return authRequest('/api/v1/admin/admin_menu/all', {
    method: 'get',
    params,
  });
}

/*
 *@Author: frank
 *@Date: 2022-11-20 21:58:08
 *@Description:
 */
export async function addMenu(data = {}) {
  return authRequest('/api/v1/admin/admin_menu', {
    method: 'post',
    data,
  });
}

/*
 *@Author: frank
 *@Date: 2022-11-20 22:40:40
 *@Description: 编辑菜单
 */

export async function editMenu(data: any = {}) {
  return authRequest(`/api/v1/admin/admin_menu/${data.id}`, {
    method: 'post',
    data,
  });
}

/*
 *@Author: frank
 *@Date: 2022-11-22 16:44:10
 *@Description: 删除一条菜单
 */
export async function deleteMenu(id: number) {
  return authRequest(`/api/v1/admin/admin_menu/${id}`, {
    method: 'delete',
  });
}
