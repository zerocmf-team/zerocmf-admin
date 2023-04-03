import { authRequest } from '@/utils/request';

/* 获取应用列表 */
export async function list(params = {}) {
    return authRequest('/api/v1/portal/admin/app', {
        method: 'get',
        params,
    });
}

/* 新增应用 */
export async function add(data: any) {
    return authRequest('/api/v1/portal/admin/app', {
        method: 'post',
        data,
    });
}

/* 编辑应用 */
export async function edit(id:number,data: any) {
    return authRequest(`/api/v1/portal/admin/app/${id}`, {
        method: 'post',
        data,
    });
}