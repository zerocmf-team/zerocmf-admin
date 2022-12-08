import React, { useRef } from 'react';
import { Button, Popconfirm, Divider, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getPortalCategorys, deletePortalCategory } from '@/services/portalCategory';

const statusObj = { enable: 1, disable: 0 };
const status = ['停用', '启用'];

const Category = () => {
  const ref = useRef<any>();
  // 确认删除
  const confirmDelete = async (id: number) => {
    const result = await deletePortalCategory(id);
    if (result.code === 1) {
      message.success(result.msg);
      ref.current.reload();
      return;
    }
    message.error(result.msg);
  };
  // 批量删除
  const handleBatch = async (selectedRowKeys: any) => {
    console.log('selectedRowKeys', selectedRowKeys);
  };
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      search: false,
    },
    {
      title: '排序',
      width: 120,
      dataIndex: 'list_order',
      key: 'list_order',
      search: false,
      render: (val: any, _: any, key: number) => (
        <Input
          style={{ display: 'inline-block', width: '60px' }}
          name={`list_order[${key}]`}
          defaultValue={val}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      initialValue: 'all',
      order: '5',
      width: 100,
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
      width: 240,
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, item: any) => (
        <>
          <a
            onClick={() => {
              history.push(`/portal/category/add?pid=${item.id}`);
            }}
          >
            添加子分类
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              history.push(`/portal/category/edit/${item.id}`);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="您确定删除吗?"
            okText="确认"
            cancelText="取消"
            onConfirm={() => confirmDelete(item.id)}
            placement="topRight"
          >
            <a style={{ color: '#ff4d4f' }}>删除</a>
          </Popconfirm>

          <Divider type="vertical" />

          <Popconfirm
            title="您确定隐藏吗?"
            okText="确认"
            cancelText="取消"
            // onConfirm={() => confirmStatus(item.id)}
            placement="topRight"
          >
            <a style={{ color: 'rgba(0, 0, 0, 0.45)' }}>隐藏</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const getData = async (params: any) => {
    params.status = statusObj[params.status];
    const result = await getPortalCategorys(params);
    let data = [];
    if (result.code === 1) {
      data = result.data.data;
      if (data) {
        data.map((v: any) => {
          const temp = v;
          temp.status = status[v.status];
          return temp;
        });
      }
    }
    return { data };
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        headerTitle="分类管理"
        request={getData}
        actionRef={ref}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              history.push('/portal/category/add');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Popconfirm
              key="batchDelete"
              title="您确定全部删除吗?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handleBatch(selectedRowKeys);
              }}
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
export default Category;
