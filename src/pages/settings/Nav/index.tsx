import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Tag, Divider, Modal, Switch, message, Popconfirm } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useImmer } from 'use-immer';
import { addNav, delNav, editNav, listNav } from '@/services/nav';
import ModalNavItem from './navItem';

const SaveModal = forwardRef((props: any, ref) => {
  const { onOk } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [state, setState] = useImmer({
    title: '新增导航',
  });

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      open(record: any) {
        form.setFieldsValue(record);
        setOpen(true);
      },
    };
  });

  return (
    <Modal
      confirmLoading={confirmLoading}
      onCancel={() => {
        setOpen(false);
      }}
      title={state.title}
      open={open}
      onOk={() => {
        form.submit();
      }}
      destroyOnClose
    >
      <Form
        preserve={false}
        onFinish={async (values) => {
          const params = {
            ...values,
            key: values.key ? 'main' : '',
          };
          const { id } = params;
          setConfirmLoading(true);
          let res;
          if (id > 0) {
            res = await editNav(id, params);
          } else {
            res = await addNav(params);
          }
          setConfirmLoading(false);
          if (res.code != 1) {
            message.error(res.msg);
            return;
          }
          setOpen(false);
          if (onOk) {
            onOk();
          }
          message.success(res.msg);
        }}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item label="id" name="id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '导航名称不能为空!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input />
        </Form.Item>

        <Form.Item label="主菜单" name="key" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
});

const Index = () => {
  const modalRef = useRef<any>();
  const modalItemRef = useRef<any>();
  const actionRef = useRef<any>();

  const fetchDelete = async (id: number) => {
    const res = await delNav(id);
    if (res.code != 1) {
      message.error(res.msg);
      return;
    }
    actionRef.current.reload();
    message.success(res.msg);
  };

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      key: 'id',
      search: false,
    },
    {
      width: 300,
      title: '导航名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '主导航',
      dataIndex: 'key',
      width: 200,
      search: false,
      key: 'key',
      render: (key: any) => key === 'main' && <Tag color="#2db7f5">是</Tag>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      search: false,
    },
    {
      title: '操作',
      width: 180,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: any) => (
        <>
          <a
            onClick={() => {
              modalItemRef.current.open({ ...record, title: '菜单管理' });
            }}
          >
            菜单管理
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              modalRef.current.open(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="您确定删除吗?"
            onConfirm={() => {
              fetchDelete(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: 'var(--ant-error-color)' }}>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <SaveModal
        ref={modalRef}
        onOk={() => {
          actionRef.current.reload();
        }}
      />

      <ModalNavItem ref={modalItemRef} />

      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        request={async (params = {}) => {
          const res = await listNav(params);
          if (res.code != 1) {
            message.error(res.msg);
            return {
              success: false,
            };
          }
          const { data } = res.data;
          return {
            data,
            success: true,
            total: res.total,
          };
        }}
        headerTitle="导航栏列表"
        toolBarRender={() => [
          <Button
            onClick={() => {
              modalRef.current.open();
            }}
            key="add"
            type="primary"
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};

export default Index;
