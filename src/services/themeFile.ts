import { authRequest } from '@/utils/request';

export async function getThemeFiles(params: any) {
    return authRequest('/api/v1/portal/admin/theme_file/list', {
        method: 'GET',
        params,
    });
}
