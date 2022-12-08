import { authRequest } from '@/utils/request';

/*
 *@Author: frank
 *@Date: 2022-11-17 16:15:35
 *@Description: 获取所有图片
*/

export async function getAssets(params: any) {
    return authRequest('/api/v1/admin/assets', {
        method: 'get',
        params,
    });
}

/*
 *@Author: frank
 *@Date: 2022-11-17 16:15:49
 *@Description: 删除一条图片
*/
export async function deleteAssets(id: any) {
    return authRequest(`/api/v1/admin/assets/${id}`, {
        method: 'DELETE',
    });
}

/*
 *@Author: frank
 *@Date: 2022-11-17 16:16:02
 *@Description: 上传一张图片 
*/
export async function addAssets(params: any) {
    return authRequest('/api/v1/admin/assets', {
        method: 'POST',
        params,
    });
}
