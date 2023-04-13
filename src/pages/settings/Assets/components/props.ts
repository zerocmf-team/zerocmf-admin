import { message } from 'antd';

export function uploadProps(type: number, onChange: any): any {
  const token: any = localStorage.getItem('token');
  if (!token) {
    message.error('用户未登录!');
    return;
  }
  return {
    name: 'file',
    multiple: true,
    action: '/api/v1/admin/assets',
    data: { type },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    showUploadList: false,
    onChange(info: { file: { status: string; name: string; response: any } }) {
      if (info.file.status === 'done') {
        const { response } = info.file;

        if (response.code == 0) {
          message.error(response.msg);
          return;
        }

        if (onChange) {
          onChange();
        }

        message.success(response.msg);
      }
    },
  };
}
