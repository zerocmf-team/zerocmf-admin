import { getList } from '@/services/department';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import ModalForm from './components/modalForm';
interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
  {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name',
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
    width: '15%',
    render: () => (
      <Space size="middle">
        <a onClick={() => {}}>
          <EditOutlined />
          修改
        </a>
        <a onClick={() => {}}>
          <PlusOutlined />
          添加
        </a>
        <Popconfirm title="您确定删除吗?" onConfirm={() => {}} okText="确定" cancelText="取消">
          <a style={{ color: 'var(--ant-error-color)' }}>
            <DeleteOutlined />
            删除
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const modalFormRef = useRef<any>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await getList();
      if (res.code === 1) {
        setData(res.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const onFinish = () => {};

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
        <Table rowKey="id" columns={columns} dataSource={data} />
      </PageContainer>
    </>
  );
};
export default Index;
