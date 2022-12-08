import { authRequest } from '@/utils/request';

export async function getSettings() {
    return authRequest('/api/v1/admin/settings');
}

export async function setSettings(params: any) {
    return authRequest('/api/v1/admin/settings', {
        method: 'POST',
        data: params,
    });
}
