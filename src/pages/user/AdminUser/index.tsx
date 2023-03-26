import { useRef, useState } from 'react';
import { Link, history } from 'umi';
import { Button, Divider, message, Popconfirm, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getDatas, deleteAccount } from '@/services/user';

const { Text } = Typography;

const Index = () => {
  const [total, setTotal] = useState(0);

  const tableRef = useRef<any>();

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'user_login',
    },
    {
      title: '邮箱',
      dataIndex: 'user_email',
    },
    {
      title: '最后登录IP',
      dataIndex: 'last_loginip',
      search: false,
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_time',
      search: false,
      render: (text) => {
        if (text === '0') {
          return '-';
        }
        return text;
      },
    },
    {
      title: '创建时间',
      key: 'create_time',
      search: true,
      width: 200,
      dataIndex: 'create_time',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      width: 110,
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <>
              <Text disabled>编辑</Text>
              <Divider type="vertical" />
              <Text disabled>删除</Text>
              {/* <Divider type="vertical" />
              <Text disabled>拉黑</Text> */}
            </>
          );
        }

        return (
          <>
            <Link to={`/account/user/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="您确定删除吗?"
              okText="确认"
              cancelText="取消"
              onConfirm={async () => {
                const res: any = await deleteAccount(record.id);
                if (res.code == 1) {
                  message.success(res.msg);
                  tableRef.current.reload();
                  return;
                }
                message.error(res.msg);
              }}
              placement="topRight"
            >
              <a style={{ color: '#ff4d4f' }}>删除</a>
            </Popconfirm>
            {/* <Divider type="vertical" />
            <Popconfirm
              title="您确定拉黑吗?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => { }}
              placement="topRight"
            >
              <a style={{ color: '#2C3E50' }}>拉黑</a>
            </Popconfirm> */}
          </>
        );
      },
    },
  ];

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

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        columns={columns}
        rowKey="id"
        request={getData}
        dateFormatter="string"
        pagination={{ total, pageSize: 10 }}
        headerTitle={`用户列表(${total}条)`}
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              history.push('/account/user/add');
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Index;
