import { Form, Input, InputNumber, message, Modal, Radio, Switch, TreeSelect } from 'antd';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { getAllAdminMenu, addMenu, editMenu } from '@/services/adminMenu';
import { useImmer } from 'use-immer';
import { useIntl } from 'umi';

const ModalForm = forwardRef((props: any, ref) => {
  const { onFinish } = props;
  const [form] = Form.useForm();

  const intl = useIntl();

  const [modalVisit, setModalVisit] = useState(false);
  const [state, setState] = useImmer<any>({
    title: '添加菜单',
    treeData: [
      {
        name: '作为一级菜单',
        id: '0',
      },
    ],
    formData: {
      hide_in_menu: 0,
      icon: '',
      list_order: 10000,
      menu_type: 0,
      name: '',
      parent_id: 0,
      path: '',
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
        if (formData.locale) {
          formData.locale = intl.formatMessage({
            id: formData.locale,
          });
        }
        formData.hide_in_menu = formData.hide_in_menu ? true : false;
        form.setFieldsValue(formData);
      }
      setModalVisit(true);
    },
  }));

  const fetchData = useCallback(async () => {
    const res = await getAllAdminMenu();
    if (res.code == 1) {
      const { data = [] } = res;

      const recursion: any = (arr: []) => {
        arr.forEach((item: any) => {
          item.name = intl.formatMessage({
            id: item.locale,
          });
          if (item.routes) {
            recursion(item.routes);
          }
        });
      };

      const newData = JSON.parse(JSON.stringify(data));

      recursion(newData);

      setState((draft: any) => {
        draft.treeData = [
          {
            name: '作为一级菜单',
            id: '0',
          },
          ...newData,
        ];
      });
      return;
    }
    message.error(res.msg);
  }, [intl, setState]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setModalVisit(false);
  };

  const onFormFinish = async (values: any) => {
    const { id, parent_id, hideInMenu } = values;
    if (parent_id) values.parent_id = Number(values.parent_id);
    values.hideInMenu = hideInMenu ? 1 : 0;
    let res: any;
    if (id) {
      res = await editMenu(values);
    } else {
      res = await addMenu(values);
    }
    if (res.code != 1) {
      message.error(res.msg);
      return;
    }
    setModalVisit(true);
    if (onFinish) {
      onFinish();
    }
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
        <Form.Item label="上级菜单" name="parent_id">
          <TreeSelect
            showSearch
            fieldNames={{ label: 'name', value: 'id', children: 'routes' }}
            treeData={state.treeData}
            style={{ width: '100%' }}
            treeDefaultExpandAll
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择上级菜单"
          />
        </Form.Item>
        <Form.Item label="菜单类型" name="menu_type">
          <Radio.Group>
            <Radio value={0}>菜单</Radio>
            <Radio value={1}>按钮</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单名称" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="菜单多语言" name="locale" extra={'修改src/locales文件，生成全球化语言'}>
          <Input readOnly />
        </Form.Item>

        <Form.Item label="路由地址" name="path">
          <Input />
        </Form.Item>
        <Form.Item tooltip=" 可以在菜单中不展示这个路由，包括子路由" label="隐藏菜单">
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="hideInMenu"
              style={{ width: '15%', marginRight: '20px', marginBottom: 0 }}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="icon"
              style={{ flex: '1', marginRight: '20px', marginBottom: 0 }}
              label="图标"
            >
              <Input />
            </Form.Item>
            <Form.Item name="list_order" style={{ flex: '1', marginBottom: 0 }} label="排序">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ModalForm;
