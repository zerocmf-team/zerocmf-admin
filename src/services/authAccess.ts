import { authRequest } from '@/utils/request';

export async function getData(id: number, params: any = {}) {
    return authRequest(`/api/v1/user/admin/auth_access/${id}`, {
        method: 'GET',
        params,
    });
}

export async function addData(params: any) {
    return authRequest('/api/v1/user/admin/auth_access', {
        method: 'POST',
        data: params,
    });
}

export async function editData(id: number, params: any = {}) {
    return authRequest(`/api/v1/user/admin/auth_access/${id}`, {
        method: 'POST',
        data: params,
    });
}
