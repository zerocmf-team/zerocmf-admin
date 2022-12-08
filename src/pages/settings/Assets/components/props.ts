import { message } from "antd";

export function uploadProps(type: number, onChange: any): any {
    let token: any = localStorage.getItem('token');
    if (token) {
        token = JSON.parse(token);
    }
    return {
        name: 'file',
        multiple: true,
        action: '/api/v1/admin/assets',
        data: { type },
        headers: {
            Authorization: `Bearer ${token?.access_token}`,
        },
        showUploadList: false,
        onChange(info: { file: { status: string; name: string; response: any }; }) {
            if (info.file.status === 'done') {
                const { response } = info.file

                if (response.code == 0) {
                    message.error(response.msg)
                    return
                }

                if (onChange) {
                    onChange();
                }

                message.success(response.msg)

            }
        },
    };
}
