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

export async function getMobileLogin(params: any = {}) {
    return authRequest('/api/v1/admin/settings/mobile', {
        method: 'get',
        params,
    });
}

export async function setMobileLogin(data: any = {}) {
    return authRequest('/api/v1/admin/settings/mobile', {
        method: 'post',
        data,
    });
}

export async function getWxappLogin(params: any = {}) {
    return authRequest('/api/v1/admin/settings/wxapp', {
        method: 'get',
        params,
    });
}

export async function setWxappLogin(data: any = {}) {
    return authRequest('/api/v1/admin/settings/wxapp', {
        method: 'post',
        data,
    });
}