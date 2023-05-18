import { useState, useRef, useEffect } from 'react';
import { Button, Popconfirm, Divider, message, Tag, Tooltip, TreeSelect } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { getPortals, deletePortal, deletePortals } from '@/services/portal';
import { getPortalCategoryList } from '@/services/portalCategory';
import { historyPush } from '@/utils/utils';

const statusObj = { all: '', enable: 1, disable: 0 };
const statusLabels = ['草稿', '发布'];

const Index = () => {
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState([]);
  const ref = useRef<any>();
  // 确认删除
  const confirmDelete = async (id: number) => {
    const result: any = await deletePortal(id);
    if (result.code === 1) {
      ref.current.reload();
      message.success(result.msg);
      return;
    }
    message.error(result.msg);
  };
  // 批量删除
  const handleBatch = async (selectedRowKeys: any) => {
    const result: any = await deletePortals({ ids: selectedRowKeys });
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

  useEffect(() => {
    const fetchdata = async () => {
      const res: any = await getPortalCategoryList({});
      if (res.code == 1) {
        setCategory(res.data);
      }
    };
    fetchdata();
  }, []);

  // 获取所有的分类

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
      order: 4,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      order: 5,
      renderFormItem: (
        item: any,
        { type, defaultRender, formItemProps, fieldProps, ...rest }: any,
        form: any,
      ) => (
        <TreeSelect
          fieldNames={{ label: 'name', value: 'id', children: 'children' }}
          treeData={category}
        />
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
      title: '状态',
      dataIndex: 'post_status',
      key: 'post_status',
      initialValue: 'enable',
      order: '3',
      width: 100,
      valueEnum: {
        all: {
          text: '全部',
          status: 'Default',
        },
        enable: {
          text: '发布',
          status: 'Success',
        },
        disable: {
          text: '草稿',
          status: 'Default',
        },
      },
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
              historyPush(`/portal/article/edit/${item.id}`);
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
    params.post_status = statusObj[params.post_status];
    const result: any = await getPortals(params);
    let data = [];
    setTotal(0);
    if (result.code === 1) {
      data = result.data.data;
      data.map((v: any) => {
        const temp = v;
        temp.post_status = statusLabels[v.post_status];
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
              historyPush('/portal/article/add');
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
