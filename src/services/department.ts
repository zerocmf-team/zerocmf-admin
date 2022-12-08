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