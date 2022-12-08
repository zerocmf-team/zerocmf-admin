import { getDatas } from '@/services/user';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import { useState } from 'react';

const Index = () => {
  const [total, setTotal] = useState(0);

  // 获取列表
  const getData = async (params: any) => {
    const result = await getDatas({ ...params, user_type: 1 });
    let data = [];
    if (result.code === 1) {
      data = result.data.data;
      setTotal(result.data.total);
    }
    return { data };
  };

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'user_login',
      key: 'user_login',
    },
    {
      title: '用户昵称',
      dataIndex: 'user_nickname',
      key: 'user_nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      search: false,
    },
    {
      title: '邮箱',
      dataIndex: 'user_email',
      key: 'user_email',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
      valueType: 'dateRange',
    },
    {
      title: '登录时间',
      dataIndex: 'last_login_time',
      key: 'last_login_time',
      valueType: 'dateRange',
    },
    {
      title: '最后登录IP',
      dataIndex: 'last_loginip',
      key: 'last_loginip',
    },
    {
      title: '状态',
      dataIndex: 'user_status',
      key: 'user_status',
      valueEnum: {
        0: { text: '禁用', status: 'Default' },
        1: { text: '正常', status: 'Success' },
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a onClick={() => {}}>拉黑</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        request={getData}
        columns={columns}
        dateFormatter="string"
        pagination={{ total, pageSize: 10 }}
        headerTitle={`客户列表(${total}条)`}
      />
    </PageContainer>
  );
};
export default Index;
