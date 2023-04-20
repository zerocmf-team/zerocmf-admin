import { PageContainer } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Badge, Button, Divider, Empty, message, Typography } from 'antd';
import ModalForm from './components/modalForm';
import { useRef } from 'react';
import { listPage } from '@/services/appPage';

const { Text } = Typography;

const statusEnum = {
  1: <Badge status="success" text="启用" />,
  0: <Badge status="default" text="禁用" />,
};

export default (props: any) => {
  const modalRef = useRef<any>();
  const { match = {} } = props;
  const { appId } = match?.params;

  const ref = useRef<any>();

  if (!appId) {
    return <Empty />;
  }

  const fetchData = async (data = {}) => {
    const res = await listPage(appId, data);
    if (res.code != 1) {
      message.error(res.msg);
      return false;
    }
    return res.data;
  };

  const columns: ProColumns<any>[] = [
    {
      title: '页面名称',
      width: 200,
      dataIndex: 'name',
    },
    {
      title: '页面类型',
      width: 80,
      dataIndex: 'type',
      search: false,
    },
    {
      title: '排序',
      width: 100,
      dataIndex: 'type',
      search: false,
    },
    {
      title: '创建时间',
      width: 100,
      key: 'since',
      search: false,
      dataIndex: 'createdAt',
      valueType: 'date',
    },
    {
      title: '更新时间',
      width: 100,
      key: 'since',
      search: false,
      dataIndex: 'updateAt',
      valueType: 'date',
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'all' },
        enabled: { text: '启用', status: 'Success' },
        disabled: { text: '禁用', status: 'Default' },
      },
      render: (_, record: any) => {
        const { status } = record;
        return statusEnum[status];
      },
    },
    {
      title: '操作',
      width: 100,
      key: 'option',
      valueType: 'option',

      render: (text, record) => {
        const {
          editor: { debug = false, host = '' },
        } = window as any;

        const _debug = debug ? '&debug' : '';

        if (record.isHome == 1) {
          return (
            <>
              <a
                onClick={() => {
                  modalRef.current.open(record);
                }}
                key="edit"
              >
                编辑
              </a>
              <Divider type="vertical" />
              <a
                target="_blank"
                href={`${host}/?appId=${appId}&pageId=${record.id}${_debug}`}
                key="design"
                rel="noreferrer"
              >
                设计
              </a>
              <Divider type="vertical" />
              <Text disabled>删除</Text>
              {/* <Divider type="vertical" />
              <Text disabled>拉黑</Text> */}
            </>
          );
        }
        return (
          <>
            <a
              onClick={() => {
                modalRef.current.open(record);
              }}
              key="edit"
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              target="_blank"
              href={`${host}/?appId=${appId}&pageId=${record.id}${_debug}`}
              key="design"
              rel="noreferrer"
            >
              设计
            </a>
            <Divider type="vertical" />
            <a style={{ color: '#ff4d4f' }} key="delete">
              删除
            </a>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ModalForm
        ref={modalRef}
        appId={appId}
        onFinish={() => {
          ref.current.reload();
        }}
      />
      <ProTable<any>
        actionRef={ref}
        columns={columns}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        request={async (params) => {
          params.isPublic = 0;
          const res = await fetchData(params);
          if (res) {
            return {
              data: res.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res.total,
            };
          }
          return {
            success: false,
          };
        }}
        dateFormatter="string"
        headerTitle="页面列表"
        toolBarRender={() => [
          <Button
            onClick={() => {
              modalRef.current.open();
            }}
            type="primary"
            key="primary"
          >
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
