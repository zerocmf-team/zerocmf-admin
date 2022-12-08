import { Form, Input, InputNumber, Modal, TreeSelect } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useImmer } from 'use-immer';

const ModalForm = forwardRef((props: any, ref) => {
  const [form] = Form.useForm();
  const [modalVisit, setModalVisit] = useState(false);
  const [state, setState] = useImmer<any>({
    title: '添加部门',
    treeData: [
      {
        name: '作为顶级部门',
        id: '0',
      },
    ],
    formData: {
      parent_id: 0,
      name: '',
      mobile: '',
      email: '',
      list_order: 10000,
    },
  });

  useImperativeHandle(ref, () => ({
    open: (params: any = {}) => {
      const { title, data = {} } = params;
      setState((draft: any) => {
        if (title) {
          draft.title = title;
        }
      });

      const formData = { ...data };
      if (formData) {
        if (!formData.list_order) formData.list_order = 10000;
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

  const onFormFinish = async (values: any) => {};

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

        <Form.Item label="部门名称" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="负责人" name="leader">
          <Input />
        </Form.Item>

        <Form.Item label="联系电话" name="mobile">
          <Input />
        </Form.Item>

        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="排序" name="list_order">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ModalForm;
