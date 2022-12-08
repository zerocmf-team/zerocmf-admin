import { authRequest } from '@/utils/request';

export async function getPortalTags(params: any) {
    return authRequest('/api/v1/portal/admin/tag', {
        method: 'GET',
        params,
    });
}

export async function deletePortalTag(id: number) {
    return authRequest(`/api/v1/portal/admin/tag/${id}`, {
        method: 'DELETE'
    });
}
