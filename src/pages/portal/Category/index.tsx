import { useRef } from 'react';
import { Button, Popconfirm, Divider, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  getPortalCategories,
  deletePortalCategory,
  updatePortalCategory,
} from '@/services/portalCategory';
import { historyPush } from '@/utils/utils';

const statusObj = { all: '', enable: 1, disable: 0 };

const Category = () => {
  const ref = useRef<any>();
  // 确认删除
  const confirmDelete = async (id: number) => {
    const result: any = await deletePortalCategory(id);
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

  // 显示隐藏
  const toggleStatus = (item: any) => {
    const { id, status } = item;
    const statusInt = status == '启用' ? 0 : 1;
    const fetchData = async () => {
      const res: any = await updatePortalCategory(id, { status: statusInt });
      if (res.code != 1) {
        message.error(res.msg);
        return;
      }
      ref.current.reload();
    };
    fetchData();
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
      render: (_: any, item: any) => <>{item.status ? '启用' : '禁用'}</>,
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
              historyPush(`/portal/category/add?pid=${item.id}`);
            }}
          >
            添加子分类
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              historyPush(`/portal/category/edit/${item.id}`);
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
            onConfirm={() => toggleStatus(item)}
            placement="topRight"
          >
            {item.status == '启用' && <a style={{ color: 'rgba(0, 0, 0, 0.45)' }}>隐藏</a>}
            {item.status == '停用' && <a style={{ color: '#1890ff' }}>显示</a>}
          </Popconfirm>
        </>
      ),
    },
  ];

  const getData = async (params: any) => {
    params.status = statusObj[params.status];
    const result: any = await getPortalCategories(params);
    let data = [];
    if (result.code === 1) {
      data = result.data;
    }
    return { data };
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        pagination={false}
        headerTitle="分类管理"
        request={getData}
        actionRef={ref}
        expandable={{
          defaultExpandAllRows: true,
        }}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              historyPush('/portal/category/add');
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
