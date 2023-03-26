import { useState, useRef } from 'react';
import { history } from 'umi';
import { Button, Divider, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getRoles, deleteRole } from '@/services/role';

const Index = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<any>(null);

  const confirmDelete = async (id: number) => {
    const result = await deleteRole(id);
    if (result.code === 1) {
      message.success(result.msg);
      tableRef.current.reload();
      return;
    }
    message.error(result.msg);
  };

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      key: 'id',
      search: false,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'remark',
      key: 'remark',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      initialValue: 'all',
      order: '5',
      valueEnum: {
        all: {
          text: '全部',
          status: 'Default',
        },
        enable: {
          text: '启用',
          status: 'Success',
        },
        disable: {
          text: '禁用',
          status: 'Default',
        },
      },
    },
    {
      title: '操作',
      width: 180,
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, item: any) =>
        item.id === 1 ? (
          <>
            <Button style={{ padding: 0 }} type="link" disabled>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button style={{ padding: 0 }} type="link" disabled>
              删除
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ padding: 0 }}
              type="link"
              onClick={() => {
                history.push(`/account/role/edit/${item.id}`);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title="您确定删除吗?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => confirmDelete(item.id)}
              placement="topRight"
            >
              <Button style={{ padding: 0 }} danger type="link">
                删除
              </Button>
            </Popconfirm>
          </>
        ),
    },
  ];
  // 获取列表
  const getData = async (params: any) => {
    setLoading(false);
    const statusAlias = ['disable', 'enable'];
    const statusParams = { disable: 0, enable: 1 };
    params.status = statusParams[params.status];

    const result = await getRoles(params);
    let data: any = [];
    if (result.code === 1) {
      data = result.data.data;
      data.forEach((v: any, i: number) => {
        data[i].status = statusAlias[v.status];
      });
      setTotal(result.data.total);
    }
    setLoading(false);
    return { data };
  };

  return (
    <PageContainer loading={loading}>
      <ProTable
        columns={columns}
        rowKey="id"
        pagination={{ total, pageSize: 10 }}
        headerTitle={`角色列表(${total}条)`}
        request={getData}
        actionRef={tableRef}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              history.push('/account/role/add');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Popconfirm
              title="您确定全部删除吗?"
              okText="确认"
              cancelText="取消"
              // onConfirm={() => {
              //   handleBatch(selectedRowKeys);
              // }}
              placement="topRight"
            >
              <Button danger>批量删除</Button>
            </Popconfirm>
          ),
        ]}
      />
    </PageContainer>
  );
};

export default Index;
