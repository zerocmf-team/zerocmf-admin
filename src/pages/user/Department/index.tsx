import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { getList, del } from '@/services/department';
import ModalForm from './components/modalForm';
interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const statusMap = {
  0: {
    color: '',
    text: '禁用',
  },
  1: {
    color: 'blue',
    text: '启用',
  },
};

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const modalFormRef = useRef<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await getList();
    if (res.code === 1) {
      setData(res.data);
    }
    setLoading(false);
  };

  const fetchDelete = async (id: number) => {
    const res = await del(id);
    if (res.code == 0) {
      message.error(res.msg);
      return;
    }
    fetchData();
    message.success(res.msg);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      key: 'leader',
      width: '15%',
      render: (text = '', record: any) => {
        return `${text} - ${record.mobile || record.email || ''}`;
      },
    },
    {
      title: '排序',
      dataIndex: 'list_order',
      key: 'list_order',
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '15%',
      key: 'status',
      render: (text: any) => {
        return <Tag color={statusMap[text].color}>{statusMap[text].text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: '20%',
      key: 'create_time',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      render: (text, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              modalFormRef.current.open({ ...record, title: '修改部门' });
            }}
          >
            <EditOutlined />
            修改
          </a>
          <a
            onClick={() => {
              modalFormRef.current.open({ parent_id: record.id });
            }}
          >
            <PlusOutlined />
            添加
          </a>
          <Popconfirm
            title="您确定删除吗?"
            onConfirm={() => {
              fetchDelete(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: 'var(--ant-error-color)' }}>
              <DeleteOutlined />
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = () => {
    fetchData();
  };

  return (
    <>
      <PageContainer loading={loading}>
        <ModalForm onFinish={onFinish} ref={modalFormRef} />
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              modalFormRef.current.open();
            }}
            style={{ marginBottom: 16 }}
          >
            新增
          </Button>
        </div>
        <Table
          rowKey="id"
          expandable={{
            defaultExpandAllRows: true,
          }}
          columns={columns}
          dataSource={data}
        />
      </PageContainer>
    </>
  );
};

export default Index;
