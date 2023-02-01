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

export async function getMobilelogin(params: any = {}) {
    return authRequest('/api/v1/admin/settings/mobile', {
        method: 'get',
        params,
    });
}

export async function setMobilelogin(data: any = {}) {
    return authRequest('/api/v1/admin/settings/mobile', {
        method: 'post',
        data,
    });
}