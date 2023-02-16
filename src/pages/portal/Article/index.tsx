import { useState, useRef } from 'react';
import { Button, Popconfirm, Divider, message, Tag, Tooltip, TreeSelect } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getPortals, deletePortal, deletePortals } from '@/services/portal';
import { history } from 'umi';

const statusObj = { enable: 1, disable: 0 };
const status = ['停用', '启用'];

const Index = () => {
  const [total, setTotal] = useState(0);
  const ref = useRef<any>();
  // 确认删除
  const confirmDelete = async (id: number) => {
    const result = await deletePortal(id);
    if (result.code === 1) {
      ref.current.reload();
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };
  // 批量删除
  const handleBatch = async (selectedRowKeys: any) => {
    const result = await deletePortals({ ids: selectedRowKeys });
    if (result.code === 1) {
      ref.current.reload();
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };

  const getTags = (data: []) => {
    return data.map((element: any) => (
      <Tag key={element.id} color="blue">
        {element.name}
      </Tag>
    ));
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
      title: '标题',
      dataIndex: 'post_title',
      key: 'post_title',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      renderFormItem: (item, { type, defaultRender, formItemProps, fieldProps, ...rest }, form) => (
        <TreeSelect />
      ),
      render: (_, item: any) => (
        <div style={{ maxWidth: '100px' }} className="ellipsis-1">
          <Tooltip placement="topLeft" title={getTags(item.category)}>
            {getTags(item.category)}
          </Tooltip>
        </div>
      ),
    },
    {
      title: '作者',
      dataIndex: 'user_login',
      key: 'user_login',
      width: 100,
      search: false,
    },
    {
      title: '点击量',
      dataIndex: 'post_hits',
      key: 'post_hits',
      width: 100,
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
      width: 100,
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      width: 100,
      search: false,
    },
    {
      title: '发布时间',
      dataIndex: 'published_time',
      key: 'published_time',
      width: 100,
      search: false,
    },
    {
      title: '操作',
      width: 100,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, item: any) => (
        <>
          <a
            onClick={() => {
              history.push(`/portal/article/edit/${item.id}`);
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
        </>
      ),
    },
  ];
  const getData = async (params: any) => {
    const tempParams = params;
    tempParams.status = statusObj[params.status];
    const result = await getPortals(tempParams);
    let data = [];
    setTotal(0);
    if (result.code === 1) {
      data = result.data.data;
      data.map((v: any) => {
        const temp = v;
        temp.status = status[v.status];
        return temp;
      });
      setTotal(result.data.total);
    } else {
      message.error(result.msg);
    }
    return { data };
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        pagination={{ total: total, pageSize: 10 }}
        rowSelection={{}}
        headerTitle="文章列表"
        request={getData}
        actionRef={ref}
        toolBarRender={(_, { selectedRowKeys }) => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              history.push('/portal/article/add');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Popconfirm
              key="del"
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
export default Index;
