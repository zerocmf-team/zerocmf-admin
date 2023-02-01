import { authRequest } from '@/utils/request';

export async function getList(params: any = {}) {
    return authRequest('/api/v1/user/admin/department', {
        method: 'GET',
        params,
    });
}

/*
 *@Author: frank
 *@Date: 2022-12-08 11:25:08
 *@Description: 添加部门
*/
export async function add(data: any = {}) {
    return authRequest('/api/v1/user/admin/department', {
        method: 'post',
        data,
    });
}

/*
 *@Author: frank
 *@Date: 2022-12-08 14:37:03
 *@Description: 编辑部门
*/

export async function edit(id: number, data: any = {}) {
    return authRequest(`/api/v1/user/admin/department/${id}`, {
        method: 'post',
        data,
    });
}

/*
 *@Author: frank
 *@Date: 2022-12-08 16:14:58
 *@Description: 删除部门
*/
export async function del(id: number) {
    return authRequest(`/api/v1/user/admin/department/${id}`, {
        method: 'delete',
    });
}