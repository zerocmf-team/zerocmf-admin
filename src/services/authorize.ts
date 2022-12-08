import { authRequest } from '@/utils/request';

export async function getAuthorizes(params: any = {}) {
    return authRequest(`/api/v1/user/admin/authorize`, {
        method: 'get',
        params,
    });
}

export async function getAuthorize(id: number, params: any) {
    return authRequest(`/api/v1/user/admin/authorize/${id}`, {
        method: 'get',
        params,
    });
}
