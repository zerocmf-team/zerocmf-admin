import { Form, Input, InputNumber, message, Modal, TreeSelect, Switch } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';
import { getList, add, edit } from '@/services/department';

const ModalForm = forwardRef((props: any, ref) => {
  const { onFinish } = props;

  const [form] = Form.useForm();
  const [modalVisit, setModalVisit] = useState(false);
  const [state, setState] = useImmer<any>({
    title: '',
    treeData: [
      {
        name: '作为顶级部门',
        id: '0',
      },
    ],
    formData: {
      id: 0,
      parent_id: 0,
      name: '',
      leader: '',
      mobile: '',
      email: '',
      list_order: 10000,
    },
  });

  const fetchData = async () => {
    const res = await getList();
    if (res.code == 0) {
      message.error(res.msg);
      return;
    }

    setState((draft: any) => {
      draft.treeData = [
        {
          name: '作为顶级部门',
          id: '0',
        },
        ...res.data,
      ];
    });
  };

  useImperativeHandle(ref, () => ({
    open: (data: any = {}) => {
      fetchData();

      const { title = '添加部门' } = data;
      setState((draft: any) => {
        if (title) {
          draft.title = title;
        }
      });

      const formData = { ...data };
      if (formData) {
        if (!formData.list_order) formData.list_order = 10000;
        formData.status = formData.status ? true : false;
        form.setFieldsValue(formData);
      }
      setModalVisit(true);
    },
  }));

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setModalVisit(false);
  };

  const onFormFinish = async (values: any) => {
    const { id, parent_id, status } = values;
    if (parent_id) values.parent_id = Number(values.parent_id);
    values.status = status ? 1 : 0;
    let res = null;
    if (id) {
      res = await edit(id, values);
    } else {
      res = await add(values);
    }
    if (res.code == 0) {
      message.error(res.msg);
      return;
    }

    if (onFinish) {
      onFinish();
    }

    setModalVisit(false);
  };

  return (
    <Modal
      width="800px"
      title={state.title}
      open={modalVisit}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form
        style={{ marginLeft: '40px' }}
        labelAlign="left"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        form={form}
        initialValues={state.formData}
        onFinish={onFormFinish}
        preserve={false}
      >
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item label="上级部门" name="parent_id">
          <TreeSelect
            showSearch
            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
            treeData={state.treeData}
            style={{ width: '100%' }}
            treeDefaultExpandAll
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择上级部门"
          />
        </Form.Item>

        <Form.Item label="部门名称" initialValue="" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="负责人" initialValue="" name="leader">
          <Input />
        </Form.Item>

        <Form.Item
          label="联系电话"
          name="mobile"
          initialValue=""
          rules={[
            {
              pattern:
                /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
              message: '联系电话不正确！',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          initialValue=""
          rules={[{ type: 'email', message: '邮箱格式不正确！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="排序" name="list_order">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="状态" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ModalForm;
