import { authRequest } from '@/utils/request';
import { stringify } from 'qs';

export async function getPortals(params: any) {
    return authRequest('/api/v1/portal/admin/article', {
        method: 'GET',
        params,
    });
}

export async function getPortal(id: number, params: any = {}) {
    return authRequest(`/api/v1/portal/admin/article/${id}`, {
        method: 'GET',
        params,
    });
}

export async function getPage(id: number, params: any = {}) {
    return authRequest(`/api/v1/portal/admin/page/${id}`, {
        method: 'GET',
        params,
    });
}

export async function addPortal(params: any) {
    return authRequest('/api/v1/portal/admin/article', {
        requestType: 'json',
        method: 'POST',
        data: params,
    });
}

export async function updatePortal(id: number, params: any) {
    return authRequest(`/api/v1/portal/admin/article/${id}`, {
        requestType: 'json',
        method: 'POST',
        data: params,
    });
}

export async function deletePortal(id: number, params: any = {}) {
    return authRequest(`/api/v1/portal/admin/article/${id}`, {
        method: 'DELETE',
        data: params,
    });
}

export async function deletePortals(params: any) {
    return authRequest('/api/v1/portal/admin/article', {
        method: 'DELETE',
        params,
        paramsSerializer: (params: any) => stringify(params, { arrayFormat: 'brackets' })
    });
}
