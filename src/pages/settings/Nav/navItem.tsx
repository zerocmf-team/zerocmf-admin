import {
  Form,
  message,
  Space,
  Modal,
  Input,
  TreeSelect,
  Radio,
  Select,
  InputNumber,
  Button,
  Table,
} from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import {
  addNavItem,
  delNavItem,
  editNavItem,
  navAdminItems,
  navItemOptions,
  navItemUrls,
} from '@/services/navItem';
import { useImmer } from 'use-immer';

const { Option, OptGroup } = Select;

const getHref = (params: any) => {
  let schame = '';
  let url = '';
  const record = { ...params };
  const regex: any = /^(http:\/\/)?([^\/s]*)/.exec(record.href);
  if (regex.length > 2) {
    schame = regex[1];
    url = regex[2];
  }
  if (schame?.indexOf('http') == 0) {
    record.href_type = 1;
    record.href = {
      schame,
      url,
    };
  } else {
    record.href_type = 0;
    record.href = {
      label: record.name,
      value: record.url,
    };
  }
  return record;
};

/*
 *@Author: frank
 *@Date: 2022-07-02 23:14:58
 *@Description: 选择导航弹窗
 */
const ModalNavItem: any = forwardRef((props: any, ref) => {
  const { onSave } = props;
  const [form] = Form.useForm();

  const columns = [
    {
      title: '排序',
      dataIndex: 'list_order',
      key: 'list_order',
    },
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '跳转地址',
      dataIndex: 'href',
      key: 'href',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any, index: number) => (
        <Space size="middle">
          <a
            onClick={() => {
              form.setFieldsValue({
                parent_id: record.id,
              });
            }}
          >
            添加子菜单
          </a>
          <a
            onClick={() => {
              setState((draft: any) => {
                draft.formFields = record;
              });
              const temp = getHref(record);
              setTimeout(() => {
                form.setFieldsValue(temp);
              }, 50);
            }}
          >
            编辑
          </a>
          <a
            className="ant-typography ant-typography-danger"
            onClick={() => {
              deleteNavItem(record.id);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  const defaultState: any = {
    title: '操作导航',
    visible: false,
  };

  const defaultFormState: any = {
    formTitle: '新增导航菜单',
    formVisible: false,
  };

  const [state, setState] = useImmer<any>({
    navId: 0,
    ...defaultState,
    ...defaultFormState,
    navItems: [],
    urlsData: [],
    options: [],
    formFields: {},
  });

  const initNavItems = async (id: number) => {
    const result = await navAdminItems(id);
    if (result.code === 0) {
      message.error(result.msg);
      return;
    }
    const { navId, navItems } = result?.data;
    const { onValueChange } = state;
    if (onValueChange) {
      onValueChange({ navId, value: navItems });
    }
    const parentRes = await navItemOptions(navId);
    if (parentRes.code === 0) {
      message.error(parentRes.msg);
      return;
    }
    const options = parentRes.data;
    setState((draft: any) => {
      draft.navId = navId;
      draft.navItems = navItems;
      draft.options = [
        {
          title: '/',
          value: 0,
        },
        ...options,
      ];
    });
  };

  const deleteNavItem = async (id: number) => {
    const result = await delNavItem(id);
    if (result.code === 1) {
      message.success(result.msg);
      initNavItems(state.id);
      return;
    }
    message.error(result.msg);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: async (params: any = {}) => {
        const { id, title = '' } = params;
        await initNavItems(id);
        const urlRes = await navItemUrls();
        if (urlRes.code === 0) {
          message.error(urlRes.msg);
          return;
        }
        setState((draft: any) => {
          draft.navId = id;
          draft.title = title;
          draft.visible = true;
          draft.urlsData = urlRes.data;
        });
      },
    }),
    [],
  );

  const onOk = () => {
    if (onSave) {
      onSave({ visible: true });
    }
    setState((draft: any) => {
      draft.visible = false;
    });
  };

  const onCancel = () => {
    setState((draft: any) => {
      draft.visible = false;
    });
  };

  const showForm = () => {
    setState((draft: any) => {
      draft.formVisible = true;
    });
  };

  const closeForm = () => {
    form.setFieldsValue({});
    setState((draft: any) => {
      Object.keys(defaultFormState).forEach((key) => {
        draft[key] = defaultFormState[key];
      });
    });
  };

  const FormSubmit = () => {
    form.submit();
  };

  const onFinish = async (values: any) => {
    const formData = { ...values, nav_id: state.navId };
    // 处理select label
    if (formData.href_type == 1) {
      formData.href = formData.href.schame + formData.href.url;
    } else {
      formData.href = formData.href.value;
    }
    let result: any = {};
    const { id } = values;
    if (id) {
      result = await editNavItem(id, formData);
    } else {
      result = await addNavItem(formData);
    }
    if (result.code !== 1) {
      message.error(result.msg);
      return;
    }
    initNavItems(state.navId);
    closeForm();
  };

  return (
    <>
      <Modal
        centered
        title={state.formTitle}
        open={state.formVisible}
        onCancel={closeForm}
        onOk={FormSubmit}
        destroyOnClose
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          autoComplete="off"
          preserve={false}
          onFinish={onFinish}
        >
          <Form.Item style={{ display: 'none' }} label="ID" name="id" initialValue={''}>
            <Input />
          </Form.Item>

          <Form.Item label="上级" name="parent_id" initialValue={0}>
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeDefaultExpandAll
              treeData={state.options}
            />
          </Form.Item>

          <Form.Item name="href_type" label="地址类型" initialValue={0}>
            <Radio.Group
              onChange={(e) => {
                const { value } = e.target;
                const record = getHref(state.formFields);
                let href = {};
                if (record.href_type == value) {
                  href = record.href;
                }
                form.setFieldValue('href', href);
              }}
            >
              <Radio value={0}>默认</Radio>
              <Radio value={1}>自定义</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="地址" shouldUpdate>
            {() => {
              return (
                <Form.Item
                  noStyle
                  name="href"
                  rules={[
                    {
                      required: true,
                      message: '地址不能为空',
                    },
                  ]}
                >
                  {form.getFieldValue('href_type') === 1 ? (
                    <Input.Group compact>
                      <Form.Item initialValue="http://" noStyle name={['href', 'schame']}>
                        <Select style={{ width: '30%' }}>
                          <Option value="http://">http://</Option>
                          <Option value="https://">https://</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item initialValue="" noStyle name={['href', 'url']}>
                        <Input style={{ width: '70%' }} />
                      </Form.Item>
                    </Input.Group>
                  ) : (
                    <Select
                      labelInValue
                      onChange={(e: any) => {
                        form.setFieldsValue({
                          name: e.label,
                        });
                      }}
                      placeholder="请选择"
                    >
                      {state.urlsData.map((options: any, index: number) => (
                        <OptGroup key={index} label={options.label}>
                          {options?.options.map((option: any, oi: number) => (
                            <Option key={`${index}-${oi}`} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </OptGroup>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: '菜单名称不能为空',
              },
            ]}
            label="菜单名称"
            name="name"
            initialValue={''}
          >
            <Input />
          </Form.Item>

          <Form.Item label="打开方式" name="target" initialValue={'_self'}>
            <Select>
              <Option value="_self">默认方式</Option>
              <Option value="_blank">新窗口打开</Option>
            </Select>
          </Form.Item>

          <Form.Item label="图标" name="icon" initialValue={''}>
            <Input />
          </Form.Item>

          <Form.Item label="排序" name="list_order" initialValue={10000}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="状态" name="status" initialValue={1}>
            <Select>
              <Option value={1}>显示</Option>
              <Option value={0}>隐藏</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        centered
        width={'50%'}
        title={state.title}
        open={state.visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={showForm} type="primary" style={{ marginBottom: 16 }}>
              新增
            </Button>
          </div>
          <Table rowKey="id" dataSource={state.navItems} columns={columns} />
        </div>
      </Modal>
    </>
  );
});

export default ModalNavItem;
