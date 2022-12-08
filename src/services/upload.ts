import { authRequest } from '@/utils/request';

export async function getUpload() {
    return authRequest('/api/v1/admin/upload', {
        method: 'get',
    });
}

export async function updateUpload(params: any) {
    return authRequest('/api/v1/admin/upload', {
        method: 'post',
        data: params,
    });
}
