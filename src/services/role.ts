import { authRequest } from '@/utils/request';

export async function getRoles(params: any) {
    return authRequest('/api/v1/user/admin/role', {
        method: 'GET',
        params,
    });
}

export async function getRole(id: number, params: any = {}) {
    return authRequest(`/api/v1/user/admin/role/${id}`, {
        method: 'GET',
        params,
    });
}

export async function deleteRole(id: number) {
    return authRequest(`/api/v1/user/admin/role/${id}`, {
        method: 'delete',
    });
}
